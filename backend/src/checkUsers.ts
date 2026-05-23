import pool from './db.js';

const checkUsers = async () => {
  try {
    const res = await pool.query('SELECT idUsuario, nombre, email, fechaRegistro FROM Usuario');
    console.log('--- USUARIOS REGISTRADOS ---');
    console.table(res.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error consultando usuarios:', err);
    process.exit(1);
  }
};

checkUsers();
