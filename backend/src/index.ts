// backend/src/index.ts
// Entry point del backend API
// Servidor Express que sirve las rutas de la aplicación

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
