/**
 * 📄 ARCHIVO: IntranetPage.tsx
 * 📝 DESCRIPCIÓN: Componente principal del portal del empleado (Intranet).
 */

// IntranetPage.tsx
// Página principal de la intranet corporativa para empleados.
// Contiene noticias, calendario, acceso a normas, vacaciones, teletrabajo y comité de empresa.

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
  { id: 1, title: 'Campaña de Ventas: Steam Summer Sale', img: news1, desc: 'Nuestros títulos principales entrarán en promoción global. Revisar el stock de keys y cupones de descuento.' },
  { id: 2, title: 'Migración a PostgreSQL AWS Finalizada', img: news2, desc: 'La infraestructura de ventas ahora es un 40% más rápida. Todo el historial de compras ha sido migrado y asegurado.' },
  { id: 3, title: 'Workshop: Optimización de Embudo de Conversión', img: news3, desc: 'Cómo mejorar el ratio de compra en la tienda usando análisis detallado de comportamiento de usuario.' }
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
            Comité de Empresa
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
