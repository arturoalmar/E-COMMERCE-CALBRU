/**
 * 📄 ARCHIVO: CauldronDAO.ts
 * 📝 DESCRIPCIÓN: Objeto de Acceso a Datos (DAO) para la gestión de calderos y sus atributos.
 */

import pool from '../db.js';
import { randomUUID } from 'crypto';

const GENRE_NAME_TO_ENUM: Record<string, string> = {
  Cards: 'cartas',
  Platformer: 'plataformas',
  Party: 'party',
  Autoshooter: 'roguelite',
  'Juego de Cartas': 'cartas',
  'Plataformas': 'plataformas',
  'Estilo Mario Party': 'party',
  'Estilo Vampire Survivor': 'roguelite',
  cartas: 'cartas',
  plataformas: 'plataformas',
  party: 'party',
  roguelite: 'roguelite'
};

const ENUM_TO_FRONT_GENRE: Record<string, string> = {
  cartas: 'Juego de Cartas',
  plataformas: 'Plataformas',
  party: 'Estilo Mario Party',
  roguelite: 'Estilo Vampire Survivor'
};

const STATUS_MAP: Record<string, 'pendiente' | 'demo' | 'pagado'> = {
  pendiente: 'pendiente',
  demo: 'demo',
  pagado: 'pagado',
  comprado: 'pagado'
};

const ATTRIBUTE_CATEGORY_KEYWORDS: Array<{ pattern: RegExp; category: 'diseño' | 'mecanicas' | 'sonido' | 'tematica' }> = [
  { pattern: /diseno|design|comic|sketch|3d|pixel|minimal|noir|elegante|rustico|realist/i, category: 'diseño' },
  { pattern: /puzzle|turn|jump|stealth|skill|combat|craft|resource|lives|simulacion|aventura|exploracion/i, category: 'mecanicas' },
  { pattern: /sonido|sound|orchestral|synth|bells|rock|metal|funk|ambient|calm|mistery|campanas|flauta|eco|susurros/i, category: 'sonido' },
  { pattern: /medieval|fantasy|cyber|post|alien|superhero|zombie|demon|brujeria|leyenda|mistico|forestal|lunar/i, category: 'tematica' }
];

export interface Cauldron {
  idCaldero?: string;
  id_usuario: string;
  nombre: string;
  tipo_nombre?: string;
  tipoJuego?: string;
  estado?: 'pendiente' | 'demo' | 'pagado' | 'comprado';
  precio?: number;
  fechaCreacion?: string;
  softDeleted?: boolean;
  config_ia?: string;
  atributos?: string[];
}

class CauldronDAO {
  async findAllByUserId(userId: string): Promise<any[]> {
    const query = `
      SELECT
        c.idCaldero AS id_caldero,
        c.idUsuario AS id_usuario,
        c.nombre,
        c.estado,
        c.precio,
        c.fechaCreacion AS fecha_creacion,
        CASE c.tipoJuego::text
          WHEN 'cartas'      THEN 'Juego de Cartas'
          WHEN 'plataformas' THEN 'Plataformas'
          WHEN 'party'       THEN 'Estilo Mario Party'
          WHEN 'roguelite'   THEN 'Estilo Vampire Survivor'
          ELSE c.tipoJuego::text
        END as genero,
        COALESCE((SELECT COUNT(*) FROM Caldero_Atributos ca WHERE ca.idCaldero = c.idCaldero), 0) as ingredientes,
        COALESCE(
          (SELECT STRING_AGG(a.label, ', ' ORDER BY a.label)
           FROM Caldero_Atributos ca
           JOIN Atributos a ON ca.idAtributo = a.idAtributo
           WHERE ca.idCaldero = c.idCaldero),
          'No ingredients added yet'
        ) as descripcion
      FROM Caldero c
      WHERE c.idUsuario = $1 AND c.softDeleted = FALSE
      ORDER BY c.fechaCreacion DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  normalizeGenre(name: string | undefined): string | null {
    if (!name) return null;
    return GENRE_NAME_TO_ENUM[name] || GENRE_NAME_TO_ENUM[name.toLowerCase()] || null;
  }

  normalizeStatus(status: string | undefined): 'pendiente' | 'demo' | 'pagado' {
    if (!status) return 'pendiente';
    return STATUS_MAP[status] || 'pendiente';
  }

  inferAttributeCategory(label: string): 'diseño' | 'mecanicas' | 'sonido' | 'tematica' {
    for (const entry of ATTRIBUTE_CATEGORY_KEYWORDS) {
      if (entry.pattern.test(label)) {
        return entry.category;
      }
    }
    return 'diseño';
  }

  async create(cauldron: Cauldron): Promise<any> {
    if (!cauldron.id_usuario) {
      throw new Error('id_usuario es obligatorio para crear un caldero');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      console.log('🪄  CauldronDAO.create — id_usuario:', cauldron.id_usuario, '| nombre:', cauldron.nombre);
      const tipoJuego = this.normalizeGenre(cauldron.tipo_nombre || cauldron.tipoJuego) || 'cartas';
      const estado = this.normalizeStatus(cauldron.estado);
      const idCaldero = randomUUID();
      const fechaCreacion = new Date().toISOString();

      const cauldronQuery = `
        INSERT INTO Caldero (idCaldero, nombre, estado, precio, fechaCreacion, tipoJuego, idUsuario, softDeleted)
        VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE)
        RETURNING idCaldero AS id_caldero, idUsuario AS id_usuario, nombre, estado, precio, fechaCreacion AS fecha_creacion, tipoJuego AS genero
      `;
      const cauldronValues = [
        idCaldero,
        cauldron.nombre,
        estado,
        cauldron.precio ?? 0,
        fechaCreacion,
        tipoJuego,
        cauldron.id_usuario
      ];
      const cauldronResult = await client.query(cauldronQuery, cauldronValues);
      const newCauldron = cauldronResult.rows[0];

      if (cauldron.atributos && cauldron.atributos.length > 0) {
        for (const attrLabel of cauldron.atributos) {
          try {
            // Buscar por label exacto primero
            const existingAttr = await client.query(
              'SELECT idAtributo FROM Atributos WHERE label = $1',
              [attrLabel]
            );
            let idAtributo: string;

            if ((existingAttr.rowCount ?? 0) > 0) {
              idAtributo = existingAttr.rows[0].idatributo;
            } else {
              // El label no existe — buscar por id (fallback cuando el frontend
              // envía el id crudo en vez del label por el bug diseño/diseno)
              const attrById = await client.query(
                'SELECT idAtributo FROM Atributos WHERE idAtributo = $1',
                [attrLabel]
              );
              if ((attrById.rowCount ?? 0) > 0) {
                idAtributo = attrById.rows[0].idatributo;
              } else {
                // No existe ni por label ni por id — omitir este atributo
                console.warn(`⚠️  Atributo no encontrado, se omite: "${attrLabel}"`);
                continue;
              }
            }

            await client.query(
              'INSERT INTO Caldero_Atributos (idCaldero, idAtributo) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              [idCaldero, idAtributo]
            );
          } catch (attrError) {
            // Error individual en un atributo: solo advertencia, no cancela el caldero
            console.warn(`⚠️  Error vinculando atributo "${attrLabel}", se omite:`, attrError);
          }
        }
      }

      await client.query('COMMIT');
      return { ...newCauldron, ingredientes: cauldron.atributos?.length ?? 0, descripcion: 'Sin descripción' };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async buy(calderoId: string, userId: string, informacion?: string): Promise<any> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const cauldronResult = await client.query(
        'SELECT idCaldero AS id_caldero, precio FROM Caldero WHERE idCaldero = $1',
        [calderoId]
      );

      if (cauldronResult.rowCount === 0) {
        await client.query('ROLLBACK');
        throw new Error('Caldero no encontrado');
      }

      const precio = cauldronResult.rows[0].precio ?? 0;
      const purchaseId = randomUUID();
      const fechaCompra = new Date().toISOString();

      const purchaseResult = await client.query(
        `INSERT INTO Compra (idCompra, fechaCompra, informacion, cancelado, idUsuario, idCaldero)
         VALUES ($1, $2, $3, FALSE, $4, $5)
         RETURNING *`,
        [purchaseId, fechaCompra, informacion || '', userId, calderoId]
      );

      await client.query(
        'UPDATE Caldero SET estado = $1 WHERE idCaldero = $2',
        ['pagado', calderoId]
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

  async update(id: string, userId: string, updates: Partial<Cauldron>): Promise<any | null> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { nombre, tipo_nombre, estado, precio, atributos } = updates;
      const normalizedEstado = estado ? this.normalizeStatus(estado) : undefined;
      const normalizedGenre  = tipo_nombre ? this.normalizeGenre(tipo_nombre) : null;

      // Build the SET clause dynamically so we never pass NULL for an enum parameter
      const setClauses: string[] = [
        'nombre    = COALESCE($1, nombre)',
        'estado    = COALESCE($2, estado)',
        'precio    = COALESCE($3, precio)',
      ];
      const queryParams: (string | number | null | undefined)[] = [
        nombre ?? null,
        normalizedEstado ?? null,
        precio ?? null,
      ];
      let nextParam = 4;

      if (normalizedGenre) {
        setClauses.push(`tipoJuego = $${nextParam}::tipo_juego_enum`);
        queryParams.push(normalizedGenre);
        nextParam++;
      }

      // WHERE params
      queryParams.push(id, userId);
      const pId     = nextParam;
      const pUserId = nextParam + 1;

      const updateQuery = `
        UPDATE Caldero
        SET ${setClauses.join(', ')}
        WHERE idCaldero = $${pId} AND idUsuario = $${pUserId}
        RETURNING idCaldero AS id_caldero, idUsuario AS id_usuario, nombre, estado, precio,
                  fechaCreacion AS fecha_creacion, tipoJuego::text AS genero
      `;

      console.log('🔧 CauldronDAO.update — id:', id, '| userId:', userId, '| genre:', normalizedGenre ?? '(unchanged)');
      const result = await client.query(updateQuery, queryParams);

      if ((result.rowCount ?? 0) === 0) {
        await client.query('ROLLBACK');
        return null;
      }

      // Si se envían atributos, reemplazar los existentes
      if (Array.isArray(atributos)) {
        await client.query('DELETE FROM Caldero_Atributos WHERE idCaldero = $1', [id]);

        for (const attrLabel of atributos) {
          try {
            const existingAttr = await client.query(
              'SELECT idAtributo FROM Atributos WHERE label = $1', [attrLabel]
            );
            let idAtributo: string;

            if ((existingAttr.rowCount ?? 0) > 0) {
              idAtributo = existingAttr.rows[0].idatributo;
            } else {
              const attrById = await client.query(
                'SELECT idAtributo FROM Atributos WHERE idAtributo = $1', [attrLabel]
              );
              if ((attrById.rowCount ?? 0) > 0) {
                idAtributo = attrById.rows[0].idatributo;
              } else {
                console.warn(`⚠️  Atributo no encontrado al editar, se omite: "${attrLabel}"`);
                continue;
              }
            }
            await client.query(
              'INSERT INTO Caldero_Atributos (idCaldero, idAtributo) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              [id, idAtributo]
            );
          } catch (attrError) {
            console.warn(`⚠️  Error vinculando atributo "${attrLabel}" en edición, se omite:`, attrError);
          }
        }
      }

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const query = 'DELETE FROM Caldero WHERE idCaldero = $1 AND idUsuario = $2';
    const result = await pool.query(query, [id, userId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export default new CauldronDAO();
