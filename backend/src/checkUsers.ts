import pool from './db.js';

const checkUsers = async () => {
  try {
    const res = await pool.query('SELECT id, username, email, created_at FROM usuarios');
    console.log('--- USUARIOS REGISTRADOS ---');
    console.table(res.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error consultando usuarios:', err);
    process.exit(1);
  }
};

checkUsers();
