import pool from './db';

const createTables = async () => {
  const queryText = `
    DROP TABLE IF EXISTS usuarios CASCADE;
    CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(150) UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log('Creando tabla de usuarios...');
    await pool.query(queryText);
    console.log('✅ Tabla "usuarios" lista o ya existente.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creando la tabla:', err);
    process.exit(1);
  }
};

createTables();
