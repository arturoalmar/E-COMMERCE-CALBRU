// backend/src/index.ts
// Entry point del backend API
// Servidor Express que sirve las rutas de la aplicación

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Probar conexión a la base de datos
pool.query('SELECT NOW()')
  .then(res => {
    console.log('Conectado a PostgreSQL con éxito:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ Error crítico: No se pudo conectar a la base de datos.');
    console.error('Asegúrate de que la contraseña en el archivo .env es correcta.');
    // No matamos el proceso para permitir que el servidor responda errores 500 en lugar de "Failed to fetch"
  });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Rutas básicas
app.get('/api', (req, res) => {
  res.json({ message: 'E-Commerce Cauldron Game API' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
