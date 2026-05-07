/**
 * 📄 ARCHIVO: MyCauldronsPage.tsx
 * 📝 DESCRIPCIÓN: Página que muestra la colección de calderos creados por el usuario.
 */

// MyCauldronsPage.tsx
// Página de estado de los calderos guardados. Actualmente muestra un estado vacío si no hay calderos.

import React from 'react';
import './MyCauldronsPage.css';


// SECCIÓN: Componente o Función lógica
const MyCauldronsPage: React.FC = () => {
  // SECCIÓN: Renderizado visual
  return (
    <div className="my-cauldrons-page" style={{ padding: '100px 2rem 2rem', color: 'white' }}>
      <h1>Mis Calderos</h1>
      <p>Aquí aparecerán tus pociones guardadas y tus diseños de juegos.</p>

      <div className="empty-state" style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.5 }}>
        <div style={{ fontSize: '4rem' }}>🧪</div>
        <p>Aún no tienes calderos guardados. ¡Empieza uno nuevo!</p>
      </div>
    </div>
  );
};

export default MyCauldronsPage;
