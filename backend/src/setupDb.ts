import pool from './db.js';

const createTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(150) UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS calderos (
      id_caldero SERIAL PRIMARY KEY,
      id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      genero VARCHAR(50),
      rareza VARCHAR(50),
      ingredientes INTEGER DEFAULT 0,
      imagen_url TEXT,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log('Configurando base de datos...');
    await pool.query(queryText);
    console.log('✅ Tablas "usuarios" y "calderos" listas.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error configurando la base de datos:', err);
    process.exit(1);
  }
};

createTables();
