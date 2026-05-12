import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM usuarios WHERE username = $1 OR email = $2', [username, email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El nombre de usuario o el email ya están registrados' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar usuario usando el esquema real de AWS
    const newUser = await pool.query(
      'INSERT INTO usuarios (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id_usuario AS id, username, email',
      [username, email, hashedPassword]
    );

    const createdUser = newUser.rows[0];
    const createdUserId = createdUser.id || createdUser.id_usuario;

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: createdUserId,
        username: createdUser.username,
        email: createdUser.email
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar usuario
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña usando password_hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const userId = user.id || user.id_usuario;

    // Crear token JWT
    const token = jwt.sign({ id: userId, username: user.username }, JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: userId, username: user.username }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
