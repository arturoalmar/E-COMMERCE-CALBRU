/**
 * 📄 ARCHIVO: Teletrabajo.tsx
 * 📝 DESCRIPCIÓN: Componente para la gestión de teletrabajo en la Intranet.
 */

// Teletrabajo.tsx
// Página de política de teletrabajo que explica requisitos y permite enviar una solicitud.

import React from 'react';

// SECCIÓN: Definición de datos/propiedades
interface TeletrabajoProps {
  setView: (view: 'main' | 'rules' | 'teleworking') => void;
}

// SECCIÓN: Componente o Función lógica
const Teletrabajo: React.FC<TeletrabajoProps> = ({ setView: _setView }) => {
// SECCIÓN: Renderizado visual
  return (
    <div className="sub-view-panel parchment-bg detailed-view">
      <div className="sub-view-header modern-grid-header">
        <div className="header-side-left"></div>
        <h2 className="section-title-witch centered-white-title">
          Política de Teletrabajo
        </h2>
        <div className="header-side-right"></div>
      </div>

      <div className="telework-policy-details vertical-stack full-width-content">
        <div className="policy-block pro-block">
          <h3>1. Modelos Disponibles</h3>
          <p>Calbru Games ofrece un modelo híbrido de 3 días de oficina y 2 de teletrabajo. Los perfiles Senior pueden optar al modelo "Remote First" (4 días remoto) previa aprobación del Lead de departamento.</p>
        </div>
        <div className="policy-block pro-block">
          <h3>2. Requisitos Técnicos</h3>
          <p>Es indispensable contar con una conexión estable de al menos 100 Mbps y un espacio de trabajo adecuado. La empresa proveerá báculo portátil y periféricos necesarios. La VPN corporativa debe estar activa en todo momento.</p>
        </div>
        <div className="policy-block pro-block">
          <h3>3. Cómo Solicitarlo</h3>
          <p>Para jornadas puntuales, avisa a tu Lead vía Slack con 24h de antelación. Para cambios permanentes de modelo, rellena el formulario inferior. RRHH revisará la solicitud en un máximo de 5 días hábiles.</p>
        </div>
        <div className="telework-form-worked pro-form">
          <h3>Formulario de Solicitud de Teletrabajo</h3>
          <div className="form-group">
            <label>Tipo de solicitud:</label>
            <select className="pro-input">
              <option>Jornada puntual</option>
              <option>Cambio a modelo híbrido (3/2)</option>
              <option>Cambio a modelo Remote First (4/1)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Motivo y Fechas:</label>
            <textarea className="pro-input compact-textarea" placeholder="Explica brevemente tu situación..."></textarea>
          </div>
          <button className="intranet-confirm-btn" onClick={() => alert('Solicitud de teletrabajo enviada.')}>Enviar Solicitud</button>
        </div>
      </div>
    </div>
  );
};

export default Teletrabajo;
