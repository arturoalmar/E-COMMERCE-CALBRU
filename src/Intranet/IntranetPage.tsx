import React from 'react';

const IntranetPage: React.FC = () => {
  return (
    <div className="intranet-container" style={{ padding: '2rem', color: 'white' }}>
      <h1>Panel de Administración (Intranet)</h1>
      <p>Esta sección está en desarrollo. Aquí podrás gestionar los pedidos, clientes y el inventario alquímico.</p>
      
      <div className="glass-panel" style={{ marginTop: '2rem', padding: '2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3>Próximas funcionalidades:</h3>
        <ul>
          <li>Gestión de Usuarios</li>
          <li>Estadísticas de Ventas</li>
          <li>Configuración de la Tienda</li>
        </ul>
      </div>
    </div>
  );
};

export default IntranetPage;
