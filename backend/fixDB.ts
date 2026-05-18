import pool from './src/db.js';

async function fix() {
  try {
    await pool.query("UPDATE calderos SET ruta_demo = '/public/demos/juego_rpg.html' WHERE id_caldero = 20");
    await pool.query("UPDATE calderos SET ruta_demo = '/public/demos/juego_plataformas.html' WHERE id_caldero = 21");
    console.log('Fixed DB!');
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

fix();
