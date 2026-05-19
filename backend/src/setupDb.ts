/**
 * 📄 ARCHIVO: setupDb.ts
 * 📝 DESCRIPCIÓN: Script para inicializar el esquema de la base de datos.
 * Ejecución: npm run setup-db
 */

import pool from './db.js';

const createTables = async () => {
  // Query principal que define la estructura relacional de la aplicación
  const queryText = `
    -- 1. USUARIOS: Almacena las credenciales y perfiles de los magos/aprendices
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      es_admin BOOLEAN DEFAULT FALSE,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    -- 2. TIPOS DE JUEGO: Catálogo de géneros (Cartas, Plataformas, etc.)
    CREATE TABLE IF NOT EXISTS tipos_juego (
        id_tipo SERIAL PRIMARY KEY,
        nombre VARCHAR(50) UNIQUE NOT NULL
    );

    -- 3. ATRIBUTOS: Almacena los ingredientes/opciones disponibles para los calderos
    CREATE TABLE IF NOT EXISTS atributos (
        id_atributo SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        CONSTRAINT uq_atributos_nombre_tipo UNIQUE (nombre, tipo)
    );

    -- 4. CALDEROS: Objeto central donde se guardan los proyectos personalizados
    CREATE TABLE IF NOT EXISTS calderos (
        id_caldero SERIAL PRIMARY KEY,
        id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
        id_tipo INTEGER NOT NULL REFERENCES tipos_juego(id_tipo),
        nombre VARCHAR(255) NOT NULL,
        estado VARCHAR(30) NOT NULL DEFAULT 'pendiente' 
            CHECK (estado IN ('pendiente', 'demo', 'comprado', 'juego')),
        ruta_demo VARCHAR(500), 
        ruta_juego VARCHAR(500),
        precio NUMERIC(6,2) DEFAULT 0,
        config_ia TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    -- 6. COMPRAS: Registra las compras realizadas por usuarios
    CREATE TABLE IF NOT EXISTS compras (
        id_compra SERIAL PRIMARY KEY,
        id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
        id_caldero INTEGER NOT NULL REFERENCES calderos(id_caldero),
        monto_pagado NUMERIC(6,2) NOT NULL,
        fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        estado_pago VARCHAR(30) NOT NULL CHECK (estado_pago IN ('pendiente', 'pagado', 'fallido')),
        informacion TEXT,
        CONSTRAINT uq_compras_usuario_caldero UNIQUE (id_usuario, id_caldero)
    );

    -- 5. RELACIÓN CALDERO - ATRIBUTOS: Enlace muchos-a-muchos entre calderos e ingredientes
    CREATE TABLE IF NOT EXISTS caldero_atributos (
        id_caldero INTEGER NOT NULL REFERENCES calderos(id_caldero) ON DELETE CASCADE,
        id_atributo INTEGER NOT NULL REFERENCES atributos(id_atributo),
        PRIMARY KEY (id_caldero, id_atributo)
    );

    -- SEEDING: Insertamos los tipos de juego iniciales si no existen
    INSERT INTO tipos_juego (nombre) VALUES 
    ('Juego de Cartas'), ('Plataformas'), ('Estilo Mario Party'), ('Estilo Vampire Survivor')
    ON CONFLICT (nombre) DO NOTHING;
  `;

  try {
    console.log('🔮 Configurando base de datos con el nuevo esquema...');
    await pool.query(queryText);
    console.log('✅ Esquema de base de datos actualizado y listo.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error configurando la base de datos:', err);
    process.exit(1);
  }
};

createTables();
