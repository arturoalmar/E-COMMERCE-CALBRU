/**
 * 📄 ARCHIVO: UserDAO.ts
 * 📝 DESCRIPCIÓN: Objeto de Acceso a Datos (DAO) para la tabla de usuarios.
 */

import pool from '../db.js';

export interface User {
  idUsuario?: string;
  nombre: string;
  email: string;
  contraseña: string;
  fechaRegistro?: string;
  softDeleted?: boolean;
  isAdmin?: boolean;
}

class UserDAO {
  /**
   * PostgreSQL devuelve columnas en minúsculas (idusuario, fecharegistro…).
   * Este método mapea el row crudo al objeto User con los nombres correctos.
   */
  private mapRow(row: any): User & { idUsuario: string } {
    return {
      idUsuario:     row.idusuario,
      nombre:        row.nombre,
      email:         row.email,
      contraseña:    row.contraseña,
      fechaRegistro: row.fecharegistro,
      softDeleted:   row.softdeleted,
      isAdmin:       row.isadmin ?? false,
    };
  }

  /**
   * Busca un usuario por su nombre exacto.
   */
  async findByUsername(nombre: string): Promise<(User & { idUsuario: string }) | null> {
    const query = 'SELECT * FROM Usuario WHERE nombre = $1 AND softDeleted = FALSE';
    const result = await pool.query(query, [nombre]);
    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  /**
   * Busca un usuario por su email.
   */
  async findByEmail(email: string): Promise<(User & { idUsuario: string }) | null> {
    const query = 'SELECT * FROM Usuario WHERE email = $1 AND softDeleted = FALSE';
    const result = await pool.query(query, [email]);
    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  /**
   * Verifica si existe un usuario con un nombre o email específico.
   */
  async findByUsernameOrEmail(nombre: string, email: string): Promise<(User & { idUsuario: string }) | null> {
    const query = 'SELECT * FROM Usuario WHERE nombre = $1 OR email = $2';
    const result = await pool.query(query, [nombre, email]);
    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  /**
   * Crea un nuevo registro de usuario en la base de datos.
   */
  async create(user: User): Promise<User & { idUsuario: string }> {
    const query = `
      INSERT INTO Usuario (idUsuario, nombre, email, contraseña, fechaRegistro, softDeleted)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING idUsuario, nombre, email, fechaRegistro, softDeleted
    `;
    const values = [
      user.idUsuario,
      user.nombre,
      user.email,
      user.contraseña,
      user.fechaRegistro,
      user.softDeleted ?? false
    ];
    const result = await pool.query(query, values);
    return this.mapRow(result.rows[0]);
  }
}

export default new UserDAO();
