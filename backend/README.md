# Backend - E-Commerce Cauldron Game

## Description
Backend API server para el juego E-Commerce Cauldron.

## Setup

```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` - Iniciar en modo desarrollo
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Iniciar servidor compilado
- `npm run lint` - Ejecutar ESLint

## Rutas principales
- `GET /api/health` - Health check
- `GET /api` - Información del API

## Variables de entorno
Ver `.env.example` para configurar:
- `PORT` - Puerto del servidor (default: 5000)
- `NODE_ENV` - Entorno (development/production)
