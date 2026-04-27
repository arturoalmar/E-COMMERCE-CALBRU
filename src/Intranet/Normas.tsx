import React from 'react';

interface NormasProps {
  setView: (view: 'main' | 'rules' | 'vacation' | 'teleworking') => void;
}

const Normas: React.FC<NormasProps> = ({ setView }) => {
  return (
    <div className="sub-view-panel parchment-bg detailed-view">
      <div className="top-navigation-area">
        <button className="intranet-action-link back-btn-top" onClick={() => setView('main')}>
          ← Volver al Panel
        </button>
      </div>

      <div className="sub-view-header modern-grid-header">
        <div className="header-side-left"></div>
        <h2 className="section-title-witch centered-white-title">
          Normas de Empresa
        </h2>
        <div className="header-side-right"></div>
      </div>

      <div className="rules-content-expanded vertical-stack full-width-content">
        <div className="rule-card pro-card">
          <h4>1. Horario y Puntualidad</h4>
          <p>El horario general de la oficina es de 09:00 a 18:00, con flexibilidad de entrada hasta las 10:00. Las reuniones diarias (Stand-ups) comienzan puntualmente a las 10:15. Se requiere puntualidad para no retrasar el flujo de trabajo de los equipos.</p>
        </div>
        <div className="rule-card pro-card">
          <h4>2. Uso de Equipos y Software</h4>
          <p>Los equipos proporcionados por la empresa son para uso exclusivamente profesional. Queda prohibida la instalación de software no autorizado que pueda comprometer la seguridad de la red rúnica. Las licencias de desarrollo son personales e intransferibles.</p>
        </div>
        <div className="rule-card pro-card">
          <h4>3. Comunicación Interna</h4>
          <p>Slack es nuestra herramienta principal para comunicación asíncrona. Teams se utilizará para videollamadas y reuniones formales. Se espera una respuesta a mensajes directos en un plazo máximo de 2 horas dentro del horario laboral.</p>
        </div>
        <div className="rule-card pro-card">
          <h4>4. Propiedad Intelectual y Confidencialidad</h4>
          <p>Todo código, diseño o idea generada durante la jornada laboral pertenece a Calbru Games. La firma del acuerdo de confidencialidad (NDA) es obligatoria y su vulneración conlleva medidas disciplinarias graves.</p>
        </div>
        <div className="rule-card pro-card">
          <h4>5. Espacios Comunes</h4>
          <p>La cocina y las zonas de relax deben mantenerse limpias. Es responsabilidad de cada empleado recoger sus utensilios. El respeto al silencio en las zonas de desarrollo es fundamental para la concentración del equipo.</p>
        </div>
      </div>
    </div>
  );
};

export default Normas;
