/**
 * 📄 ARCHIVO: db.ts
 * 📝 DESCRIPCIÓN: Configuración de la conexión a la base de datos PostgreSQL (AWS RDS).
 */

import * as pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';

dotenv.config();

// Creamos un pool de conexiones para manejar múltiples peticiones de forma eficiente
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'reto-final.cyaovsvccxru.us-east-1.rds.amazonaws.com',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '12345678',
  port: parseInt(process.env.DB_PORT || '5432'),
  // IMPORTANTE: SSL es necesario para conectar a AWS RDS desde entornos externos
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
