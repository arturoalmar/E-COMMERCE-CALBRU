/**
 * 📄 ARCHIVO: cauldronRoutes.ts
 * 📝 DESCRIPCIÓN: Rutas para la gestión de calderos (proyectos de juego).
 */

import { Router, Response } from 'express';
import CauldronDAO from '../DAO/CauldronDAO.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

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
  const {
    nombre,
    name,
    tipo_nombre,
    type_name,
    genre,
    atributos,
    attributes,
    estado,
    status,
    precio,
    price,
    config_ia,
    ai_config
  } = req.body;

  const cauldronName = nombre || name;
  const tipoNombre = tipo_nombre || type_name || genre;
  const cauldronAttributes = atributos || attributes;
  const cauldronEstado = estado || status;
  const cauldronPrecio = precio ?? price;
  const cauldronConfig = config_ia || ai_config;

  if (!cauldronName || !tipoNombre) {
    return res.status(400).json({ message: 'El nombre y el tipo de juego son obligatorios' });
  }

  try {
    const userId = req.user!.id;
    const newCauldron = await CauldronDAO.create({
      id_usuario: userId,
      nombre: cauldronName,
      tipo_nombre: tipoNombre,
      atributos: Array.isArray(cauldronAttributes) ? cauldronAttributes : [],
      estado: cauldronEstado || 'pendiente',
      precio: cauldronPrecio || 0,
      config_ia: cauldronConfig || ''
    });

    res.status(201).json(newCauldron);
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
    const deleted = await CauldronDAO.delete(id, userId);
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
router.post('/:id/buy', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const { informacion } = req.body;

  console.log(`🛒 Intentando compra: caldero=${id}, usuario=${userId}`);

  try {
    const purchase = await CauldronDAO.buy(id, userId, informacion);
    console.log(`✅ Compra exitosa: ${id}`);
    res.status(201).json({ message: 'Compra realizada con éxito', purchase });
  } catch (error: any) {
    console.error('❌ Error al comprar caldero:', error.message || error);
    if (error.message === 'Caldero no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('ya ha sido comprado')) {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Error en el servidor al procesar la compra' });
  }
});

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const updates = {
    nombre: req.body.nombre ?? req.body.name,
    estado: req.body.estado ?? req.body.status,
    precio: req.body.precio ?? req.body.price,
    config_ia: req.body.config_ia ?? req.body.ai_config
  };

  try {
    const updatedCauldron = await CauldronDAO.update(id, userId, updates);
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
