// src/config.ts
// Configuración dinámica de la URL base del backend para desarrollo y producción.
export const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://the-hags-cauldron-back-end.onrender.com';
