/**
 * 📄 ARCHIVO: authRoutes.ts
 * 📝 DESCRIPCIÓN: Rutas de autenticación (Registro y Login).
 */

import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserDAO from '../DAO/UserDAO.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * POST /api/auth/register
 * Registra un nuevo aprendiz de mago en el sistema.
 */
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validación básica de campos
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // 1. Verificar disponibilidad de nombre de usuario o email
    const existingUser = await UserDAO.findByUsernameOrEmail(username, email);
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario o el email ya están registrados' });
    }

    // 2. Encriptar la contraseña (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Guardar en la base de datos
    const createdUser = await UserDAO.create({
      username,
      email,
      password_hash: hashedPassword
    });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: createdUser.id_usuario,
        username: createdUser.username,
        email: createdUser.email
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor al registrar usuario' });
  }
});

/**
 * POST /api/auth/login
 * Autentica a un aprendiz y le otorga un token de acceso.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
  }

  try {
    // 1. Buscar al usuario por nombre
    const user = await UserDAO.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 2. Comparar la contraseña enviada con el hash guardado
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Generar token JWT con vigencia de 24h
    const token = jwt.sign(
      { id: user.id_usuario, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { 
        id: user.id_usuario, 
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
  }
});

export default router;
