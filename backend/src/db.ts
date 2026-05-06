import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'database-reto.cx0uaa6sktlj.us-east-1.rds.amazonaws.com',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'TU_CONTRASEÑA_AQUÍ',
  port: parseInt(process.env.DB_PORT || '5432'),
  // IMPORTANTE para AWS RDS:
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
