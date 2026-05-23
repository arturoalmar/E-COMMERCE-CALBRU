/**
 * 📄 ARCHIVO: CauldronDAO.ts
 * 📝 DESCRIPCIÓN: Objeto de Acceso a Datos (DAO) para la gestión de calderos y sus atributos.
 */

import pool from '../db.js';

const GENRE_NAME_MAP: Record<string, string> = {
  Cards: 'Juego de Cartas',
  Platformer: 'Plataformas',
  Party: 'Estilo Mario Party',
  Autoshooter: 'Estilo Vampire Survivor',
  'Juego de Cartas': 'Juego de Cartas',
  'Plataformas': 'Plataformas',
  'Estilo Mario Party': 'Estilo Mario Party',
  'Estilo Vampire Survivor': 'Estilo Vampire Survivor'
};

/**
 * Representa la estructura de un caldero (proyecto de juego)
 */
export interface Cauldron {
  id_caldero?: number;
  id_usuario: number;
  id_tipo?: number;
  nombre: string;
  estado?: 'pendiente' | 'demo' | 'comprado' | 'juego';
  ruta_demo?: string;
  ruta_juego?: string;
  precio?: number;
  config_ia?: string;
  fecha_creacion?: Date;
  // Campos auxiliares para la comunicación con el frontend
  tipo_nombre?: string;
  atributos?: string[]; // Lista de nombres de ingredientes
}

class CauldronDAO {
  /**
   * Recupera todos los calderos de un usuario específico.
   * Incluye el cálculo dinámico de ingredientes y el nombre del género.
   */
  async findAllByUserId(userId: number): Promise<any[]> {
    const query = `
      SELECT 
        c.*, 
        t.nombre as genero,
        (SELECT COUNT(*) FROM caldero_atributos ca WHERE ca.id_caldero = c.id_caldero) as ingredientes,
        COALESCE(c.config_ia, 'Sin descripción') as descripcion
      FROM calderos c
      JOIN tipos_juego t ON c.id_tipo = t.id_tipo
      WHERE c.id_usuario = $1
      ORDER BY c.fecha_creacion DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  /**
   * Busca el ID de un tipo de juego basándose en su nombre.
   */
  async findTipoIdByName(name: string): Promise<number | null> {
    const normalized = GENRE_NAME_MAP[name] || name;
    const result = await pool.query(
      'SELECT id_tipo FROM tipos_juego WHERE LOWER(nombre) = LOWER($1)',
      [normalized]
    );
    return result.rows[0]?.id_tipo || null;
  }

  /**
   * Crea un caldero completo. Utiliza una TRANSACCIÓN para asegurar que 
   * el caldero, sus atributos y sus relaciones se guarden correctamente.
   */
  async create(cauldron: Cauldron): Promise<Cauldron> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN'); // Iniciamos la transacción

      // 1. Obtener id_tipo si solo tenemos el nombre
      let id_tipo: number | undefined = cauldron.id_tipo ?? undefined;
      if (!id_tipo && cauldron.tipo_nombre) {
        // Intentamos buscar el tipo existente
        id_tipo = await this.findTipoIdByName(cauldron.tipo_nombre) ?? undefined;
        // Si no existe, lo creamos automáticamente
        if (!id_tipo) {
          const insertRes = await client.query(
            'INSERT INTO tipos_juego (nombre) VALUES ($1) RETURNING id_tipo',
            [cauldron.tipo_nombre]
          );
          id_tipo = insertRes.rows[0].id_tipo;
        }
      }

      if (!id_tipo) throw new Error(`Tipo de juego "${cauldron.tipo_nombre}" no encontrado`);

      // 2. Insertar el registro principal del caldero
      const cauldronQuery = `
        INSERT INTO calderos (id_usuario, id_tipo, nombre, estado, precio, config_ia)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const cauldronValues = [
        cauldron.id_usuario,
        id_tipo,
        cauldron.nombre,
        cauldron.estado || 'pendiente',
        cauldron.precio || 0,
        cauldron.config_ia || ''
      ];
      const cauldronResult = await client.query(cauldronQuery, cauldronValues);
      const newCauldron = cauldronResult.rows[0];

      // 3. Procesar y enlazar los atributos (ingredientes)
      if (cauldron.atributos && cauldron.atributos.length > 0) {
        for (const attrName of cauldron.atributos) {
          // Insertamos el atributo si no existe (basado en nombre y tipo)
          const attrResult = await client.query(
            'INSERT INTO atributos (nombre, tipo) VALUES ($1, $2) ON CONFLICT (nombre, tipo) DO UPDATE SET nombre = EXCLUDED.nombre RETURNING id_atributo',
            [attrName, 'ingrediente']
          );
          const id_atributo = attrResult.rows[0].id_atributo;

          // Creamos la relación en la tabla intermedia
          await client.query(
            'INSERT INTO caldero_atributos (id_caldero, id_atributo) VALUES ($1, $2)',
            [newCauldron.id_caldero, id_atributo]
          );
        }
      }

      await client.query('COMMIT'); // Confirmamos los cambios
      return newCauldron;
    } catch (error) {
      await client.query('ROLLBACK'); // Si algo falla, deshacemos todo
      throw error;
    } finally {
      client.release(); // Liberamos la conexión del pool
    }
  }

  /**
   * Registra la compra de un caldero y actualiza su estado a comprado.
   */
  async buy(calderoId: number, userId: number, informacion?: string): Promise<any> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const cauldronResult = await client.query(
        'SELECT id_caldero, precio FROM calderos WHERE id_caldero = $1',
        [calderoId]
      );

      if (cauldronResult.rowCount === 0) {
        await client.query('ROLLBACK');
        throw new Error('Caldero no encontrado');
      }

      const precio = cauldronResult.rows[0].precio ?? 0;

      const purchaseResult = await client.query(
        `INSERT INTO compras (id_usuario, id_caldero, monto_pagado, estado_pago, informacion)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [userId, calderoId, precio, 'pagado', informacion || null]
      );

      await client.query(
        'UPDATE calderos SET estado = $1 WHERE id_caldero = $2',
        ['comprado', calderoId]
      );

      await client.query('COMMIT');
      return purchaseResult.rows[0];
    } catch (error: any) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error durante ROLLBACK:', rollbackError);
      }
      if (error.code === '23505') {
        throw new Error('Este caldero ya ha sido comprado por este usuario');
      }
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Actualiza un caldero existente si pertenece al usuario.
   * Permite cambios parciales en nombre, estado, precio y configuración IA.
   */
  async update(id: number, userId: number, updates: Partial<Cauldron>): Promise<any | null> {
    const { nombre, estado, precio, config_ia } = updates;
    const query = `
      UPDATE calderos 
      SET 
        nombre = COALESCE($1, nombre),
        estado = COALESCE($2, estado),
        precio = COALESCE($3, precio),
        config_ia = COALESCE($4, config_ia)
      WHERE id_caldero = $5 AND id_usuario = $6
      RETURNING *
    `;
    const result = await pool.query(query, [nombre, estado, precio, config_ia, id, userId]);
    return result.rows[0] || null;
  }

  /**
   * Elimina un caldero si pertenece al usuario solicitante.
   */
  async delete(id: number, userId: number): Promise<boolean> {
    const query = 'DELETE FROM calderos WHERE id_caldero = $1 AND id_usuario = $2';
    const result = await pool.query(query, [id, userId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export default new CauldronDAO();
