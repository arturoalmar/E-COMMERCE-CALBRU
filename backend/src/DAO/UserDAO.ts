/**
 * 📄 ARCHIVO: UserDAO.ts
 * 📝 DESCRIPCIÓN: Objeto de Acceso a Datos (DAO) para la tabla de usuarios.
 */

import pool from '../db.js';

export interface User {
  id_usuario?: number;
  username: string;
  email: string;
  password_hash: string;
  fecha_registro?: Date;
}

class UserDAO {
  /**
   * Busca un usuario por su nombre de usuario exacto.
   */
  async findByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM usuarios WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0] || null;
  }

  /**
   * Busca un usuario por su email.
   */
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Verifica si existe un usuario con un nombre o email específico.
   * Útil para validaciones durante el registro.
   */
  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    const query = 'SELECT * FROM usuarios WHERE username = $1 OR email = $2';
    const result = await pool.query(query, [username, email]);
    return result.rows[0] || null;
  }

  /**
   * Crea un nuevo registro de usuario en la base de datos.
   */
  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO usuarios (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id_usuario, username, email, fecha_registro
    `;
    const values = [user.username, user.email, user.password_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

export default new UserDAO();
