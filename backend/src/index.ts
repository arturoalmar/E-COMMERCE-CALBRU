/**
 * 📄 ARCHIVO: index.ts
 * 📝 DESCRIPCIÓN: Punto de entrada principal (Entry Point) del servidor backend.
 * Configura Express, middlewares globales y monta las rutas de la API.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import pool from './db.js';
import authRoutes from './routes/authRoutes.js';
import cauldronRoutes from './routes/cauldronRoutes.js';

dotenv.config();

// --- 1. VERIFICACIÓN DE CONEXIÓN ---
// Intentamos realizar una consulta simple para confirmar que la base de datos es accesible
pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Conectado a PostgreSQL con éxito:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ Error crítico: No se pudo conectar a la base de datos.');
    console.error('Asegúrate de que la configuración en el archivo .env es correcta.');
  });

const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. MIDDLEWARES GLOBALES ---
app.use(cors()); // Permite peticiones desde el frontend (CORS)
app.use(express.json()); // Permite procesar cuerpos de mensaje en formato JSON
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// --- 3. RUTAS DE LA API ---
app.use('/api/auth', authRoutes); // Endpoints de registro y login
app.use('/api/cauldrons', cauldronRoutes); // Endpoints de gestión de calderos

// Health check para monitorear el estado del servidor
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Ruta base informativa
app.get('/api', (req, res) => {
  res.json({ 
    message: 'E-Commerce Cauldron Game API',
    version: '1.0.0'
  });
});

// --- 4. INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
