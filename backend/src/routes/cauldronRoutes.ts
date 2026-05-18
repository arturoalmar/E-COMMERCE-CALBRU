/**
 * 📄 ARCHIVO: cauldronRoutes.ts
 * 📝 DESCRIPCIÓN: Rutas para la gestión de calderos (proyectos de juego).
 */

import { Router, Response } from 'express';
import CauldronDAO from '../DAO/CauldronDAO.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';
import { cocinarDemoSimulada } from '../services/generarDemo.js';

const router = Router();

/**
 * GET /api/cauldrons
 * Recupera la lista de calderos que pertenecen al usuario autenticado.
 */
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const cauldrons = await CauldronDAO.findAllByUserId(userId);
    res.json(cauldrons);
  } catch (error) {
    console.error('Error al obtener calderos:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener calderos' });
  }
});

/**
 * POST /api/cauldrons
 * Crea un nuevo caldero vinculado al usuario autenticado.
 */
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { nombre, tipo_nombre, atributos, estado, precio, config_ia } = req.body;

  if (!nombre || !tipo_nombre) {
    return res.status(400).json({ message: 'El nombre y el tipo de juego son obligatorios' });
  }

  try {
    const userId = req.user!.id;
    const newCauldron = await CauldronDAO.create({
      id_usuario: userId,
      nombre,
      tipo_nombre,
      atributos: atributos || [],
      estado: estado || 'pendiente',
      precio: precio || 0,
      config_ia: config_ia || ''
    });

    // Enviar respuesta inmediata al cliente (el caldero está "pendiente" y se está cocinando)
    res.status(201).json(newCauldron);

    // Generar la demo del juego en segundo plano mediante simulación asíncrona
    cocinarDemoSimulada({
      id_caldero: newCauldron.id_caldero,
      tipoJuego: tipo_nombre,
      ingredientes: atributos || [],
      config_ia: config_ia || ''
    }).then(async (rutaDemo) => {
      // Pasados los 3 segundos de carga simulada, actualizamos el caldero a estado 'demo' con su ruta de demo
      await CauldronDAO.update(newCauldron.id_caldero!, userId, {
        estado: 'demo',
        ruta_demo: rutaDemo
      });
      console.log(`[Segundo Plano] ¡Demo del caldero ${newCauldron.id_caldero} autogenerada y guardada con éxito! Ruta: ${rutaDemo}`);
    }).catch((error) => {
      console.error(`[Segundo Plano] Error al autogenerar la demo del caldero ${newCauldron.id_caldero}:`, error);
    });

  } catch (error: any) {
    console.error('Error al crear caldero:', error);
    res.status(500).json({ message: error.message || 'Error en el servidor al crear el caldero' });
  }
});

/**
 * DELETE /api/cauldrons/:id
 * Elimina un caldero específico del usuario.
 */
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  try {
    const deleted = await CauldronDAO.delete(parseInt(id), userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Caldero no encontrado o no pertenece al usuario' });
    }
    res.json({ message: 'Caldero eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar caldero:', error);
    res.status(500).json({ message: 'Error en el servidor al eliminar el caldero' });
  }
});

// Actualizar un caldero
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const updates = req.body;

  try {
    const updatedCauldron = await CauldronDAO.update(parseInt(id), userId, updates);
    if (!updatedCauldron) {
      return res.status(404).json({ message: 'Caldero no encontrado o no pertenece al usuario' });
    }
    res.json(updatedCauldron);
  } catch (error) {
    console.error('Error al actualizar caldero:', error);
    res.status(500).json({ message: 'Error en el servidor al actualizar el caldero' });
  }
});

export default router;
