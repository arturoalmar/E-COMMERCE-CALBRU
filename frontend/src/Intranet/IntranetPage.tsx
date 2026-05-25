/**
 * 📄 ARCHIVO: IntranetPage.tsx
 * 📝 DESCRIPCIÓN: Componente principal del portal del empleado (Intranet).
 */

// IntranetPage.tsx
// Página principal de la intranet corporativa para empleados.
// Contiene noticias, calendario, acceso a normas, vacaciones, teletrabajo y delegados de personal.

import React, { useState } from 'react';
import './IntranetPage.css';

import news1 from '../assets/news1.png';
import news2 from '../assets/news2.png';
import news3 from '../assets/news3.png';

// Importación de sub-componentes reorganizados
import Normas from './Normas';
import Teletrabajo from './Teletrabajo';
import ComiteEmpresa from './ComiteEmpresa';

// Nuevos componentes extraídos para organizar
import NewsSlider, { NewsItem } from './NewsSlider';
import QuickLinks from './QuickLinks';
import IntranetCalendar from './IntranetCalendar';

// Importar el footer compartido
import Footer from '../components/Footer/Footer';

// SECCIÓN: Definición de datos/propiedades
interface IntranetPageProps {
  onBack?: () => void;
}

const NEWS_ITEMS: NewsItem[] = [
  { id: 1, title: 'Cena de empresa: El día 15 de junio tendremos cena de empresa', img: news1, desc: 'Invitamos a todos los empleados a participar en nuestra cena de empresa. Se enviará un correo con la hora y el sitio.' },
  { id: 2, title: 'Migración a PostgreSQL AWS Finalizada', img: news2, desc: 'Todo el servidor que teníamos en MySQL ha sido migrado exitosamente a PostgreSQL en AWS.' },
  { id: 3, title: 'Inicio del desarrollo de un 5 Caldero', img: news3, desc: 'Se ha empezado el desarrollo del quinto caldero para la próxima actualización de la página web. Se ha decidido que sea de carreras.' }
];

// SECCIÓN: Componente o Función lógica
const IntranetPage: React.FC<IntranetPageProps> = ({ onBack }) => {
  // Vista interna activa de la intranet. Cambia entre el panel principal y secciones de RRHH.
  const [view, setView] = useState<'main' | 'rules' | 'teleworking' | 'committee'>('main');

// SECCIÓN: Componente o Función lógica
  const renderMainView = () => (
    <>
      {/* Componente Extraído */}
      <NewsSlider newsItems={NEWS_ITEMS} />

      <div className="intranet-grid-main">
        {/* Componente Extraído */}
        <QuickLinks setView={setView} />

        <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0}}>
          {/* Componente Extraído */}
          <IntranetCalendar />
          
        </div>
      </div>
    </>
  );

// SECCIÓN: Renderizado visual
  return (
    <div className="intranet-sketch-layout intranet-full">
      {onBack && (
        <button 
          className="intranet-back-btn"
          onClick={onBack}
          title="Volver al inicio"
        >
          ← Volver
        </button>
      )}
      <nav className="intranet-sub-nav">
        <div className="sub-nav-center">
          <button 
            className={`sub-nav-btn ${view === 'main' ? 'active' : ''}`} 
            onClick={() => setView('main')}
          >
            Inicio
          </button>
          <button 
            className={`sub-nav-btn ${view === 'committee' ? 'active' : ''}`} 
            onClick={() => setView('committee')}
          >
            Delegados de Personal
          </button>
          <button 
            className={`sub-nav-btn ${view === 'teleworking' ? 'active' : ''}`} 
            onClick={() => setView('teleworking')}
          >
            Política de Teletrabajo
          </button>
          <button 
            className={`sub-nav-btn ${view === 'rules' ? 'active' : ''}`} 
            onClick={() => setView('rules')}
          >
            Normas
          </button>
        </div>
      </nav>

      <>
        {view === 'main' && renderMainView()}
        {view === 'rules' && <Normas setView={setView} />}
        {view === 'teleworking' && <Teletrabajo setView={setView} />}
        {view === 'committee' && <ComiteEmpresa setView={setView} />}
        {view === 'main' && (
          <section className="hr-form-sketch">
            <div className="form-box parchment-bg">
              <label>Mensaje al Departamento de RRHH</label>
              <textarea placeholder="Escribe tu consulta aquí..."></textarea>
              <button className="intranet-confirm-btn" onClick={() => alert('Mensaje enviado a RRHH.')}>Enviar Mensaje</button>
            </div>
          </section>
        )}
      </>
      <Footer />
    </div>
  );
};

export default IntranetPage;
