import React from 'react';

const MyCauldronsPage: React.FC = () => {
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
