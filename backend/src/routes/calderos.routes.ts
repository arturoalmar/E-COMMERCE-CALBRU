import { Router } from 'express';
import { cocinarDemoSimulada } from '../services/generarDemo.js';
import pool from '../db.js'; // Vuestra conexión a AWS RDS

const router = Router();

router.post('/cocinar', async (req, res) => {
  const { id_usuario, id_tipo, nombre, nombreTipoJuego } = req.body;

  try {
    // 1. Insertamos el caldero en la base de datos AWS en estado 'pendiente'
    const nuevoCaldero = await pool.query(
      `INSERT INTO calderos (id_usuario, id_tipo, nombre, estado) 
       VALUES ($1, $2, $3, 'pendiente') RETURNING id_caldero`,
      [id_usuario, id_tipo, nombre]
    );
    const id_caldero = nuevoCaldero.rows[0].id_caldero;

    // Responded al frontend inmediatamente que el caldero está "hirviendo"
    res.status(202).json({ id_caldero, estado: 'pendiente' });

    // 2. Ejecutamos el simulador en segundo plano
    cocinarDemoSimulada({ tipoJuego: nombreTipoJuego })
      .then(async (rutaDemo) => {
        // Cuando pasan los 3 segundos de simulación, actualizamos a estado 'demo'
        await pool.query(
          `UPDATE calderos SET estado = 'demo', ruta_demo = $1 WHERE id_caldero = $2`,
          [rutaDemo, id_caldero]
        );
        console.log(`[IA SIMULADA] Juego asignado al caldero ${id_caldero}`);
      })
      .catch((err) => console.error(err));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el caldero' });
  }
});

export default router;
