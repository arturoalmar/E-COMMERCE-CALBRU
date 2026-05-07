# E-Commerce Cauldron Game - Monorepo

Proyecto dividido en frontend y backend.

## Estructura

```
.
├── frontend/          # React + Vite aplicación
│   ├── src/          # Código fuente de React
│   ├── public/       # Recursos estáticos
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/          # Express API server
│   ├── src/         # Código fuente del servidor
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Instalación

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Requisitos
- Node.js v18+
- npm o yarn

## Desarrollo

El frontend está disponible en `http://localhost:5173` (Vite default)
El backend está disponible en `http://localhost:5000`

## Descripción del proyecto

**Frontend**: Interfaz de React para el juego E-Commerce Cauldron
- Selección de calderos (géneros)
- Configurador de ingredientes
- Páginas de landing, login, intranet

**Backend**: API REST para soportar funcionalidad futura
- Autenticación de usuarios
- Gestión de calderos/poemas
- Datos del juego

Ver README en cada carpeta para más detalles.
