/**
 * 📄 ARCHIVO: attributeRoutes.ts
 * 📝 DESCRIPCIÓN: Endpoints para obtener atributos almacenados en la base de datos.
 */

import { Router, Response } from 'express';
import pool from '../db.js';

const router = Router();

/**
 * GET /api/attributes
 * Devuelve todos los atributos registrados en la base de datos.
 */
router.get('/', async (_req, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT idAtributo AS id, label, categoria FROM Atributos ORDER BY categoria, label'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener atributos:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener atributos' });
  }
});

export default router;
