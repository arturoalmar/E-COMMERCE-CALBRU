/**
 * 📄 ARCHIVO: authMiddleware.ts
 * 📝 DESCRIPCIÓN: Middleware para proteger rutas mediante tokens JWT.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Extendemos la interfaz Request de Express para incluir los datos del usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

/**
 * Middleware que verifica la validez del token JWT en la cabecera Authorization.
 */
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido o expirado' });
    }
    // Si el token es válido, guardamos los datos del usuario en el objeto request
    req.user = user;
    next();
  });
};
