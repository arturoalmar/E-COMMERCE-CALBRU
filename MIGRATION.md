# IMPORTANTE: Estructura de Proyecto Actualizada

El proyecto ha sido reorganizado en una estructura monorepo:

## ¿Qué cambió?

- **Carpeta `frontend/`**: Contiene toda la aplicación React + Vite original
  - Es el proyecto principal donde ejecutabas `npm run dev`
  - Todos los archivos de config (vite.config.ts, tsconfig.json, etc.) están aquí
  - Aún funciona igual: `cd frontend && npm run dev`

- **Carpeta `backend/`**: Backend API nuevo (Express + TypeScript)
  - Estructura básica lista para ampliar
  - Puedes desarrollar endpoints aquí
  - `cd backend && npm install && npm run dev`

## Próximos pasos

1. Ve a `frontend/` y continúa con tu desarrollo React normalmente
2. Cuando necesites backend, expande `backend/src/`
3. Configura las rutas en el frontend para conectarse al backend en `http://localhost:5000`

Ver `README-MONOREPO.md` para detalles completos.
