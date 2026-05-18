import pool from './src/db.js';

async function run() {
  try {
    const res = await pool.query('SELECT * FROM calderos ORDER BY fecha_creacion DESC LIMIT 5');
    console.log('LAST 5 CALDEROS IN DB:', res.rows);
  } catch (err) {
    console.error('DATABASE QUERY ERROR:', err);
  } finally {
    await pool.end();
  }
}

run();
