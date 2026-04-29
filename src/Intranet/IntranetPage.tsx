import React, { useState, useMemo } from 'react';
import news1 from '../assets/news1.png';
import news2 from '../assets/news2.png';
import news3 from '../assets/news3.png';

// Importación de sub-componentes reorganizados
import Normas from './Normas';
import Vacaciones from './Vacaciones';
import Teletrabajo from './Teletrabajo';
import ComiteEmpresa from './ComiteEmpresa';

// Nuevos componentes extraídos para organizar
import NewsSlider, { NewsItem } from './NewsSlider';
import QuickLinks from './QuickLinks';
import IntranetCalendar from './IntranetCalendar';

interface IntranetPageProps {
  username: string;
}

const NEWS_ITEMS: NewsItem[] = [
  { id: 1, title: 'Campaña de Ventas: Steam Summer Sale', img: news1, desc: 'Nuestros títulos principales entrarán en promoción global. Revisar el stock de keys y cupones de descuento.' },
  { id: 2, title: 'Migración a PostgreSQL AWS Finalizada', img: news2, desc: 'La infraestructura de ventas ahora es un 40% más rápida. Todo el historial de compras ha sido migrado y asegurado.' },
  { id: 3, title: 'Workshop: Optimización de Embudo de Conversión', img: news3, desc: 'Cómo mejorar el ratio de compra en la tienda usando análisis detallado de comportamiento de usuario.' }
];

const OCCUPIED_DATA = [
  { day: 5, month: 3, year: 2026 },
  { day: 6, month: 3, year: 2026 },
  { day: 20, month: 3, year: 2026 },
  { day: 4, month: 4, year: 2026 },
  { day: 28, month: 4, year: 2026 },
  { day: 29, month: 4, year: 2026 },
  { day: 15, month: 5, year: 2026 }
];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const IntranetPage: React.FC<IntranetPageProps> = ({ username }) => {
  const [view, setView] = useState<'main' | 'rules' | 'vacation' | 'teleworking' | 'committee'>('main');
  const [selectedVacationDays, setSelectedVacationDays] = useState<{ day: number, month: number, year: number }[]>([]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [vacationDate, setVacationDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const TOTAL_VACATION_LIMIT = 22;

  const changeMonth = (direction: 'next' | 'prev') => {
    // Only used for vacation now, main calendar handles its own state
    setVacationDate(prev => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return d;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, totalDays };
  };

  const isDayInVacations = (day: number, date: Date) => {
    return selectedVacationDays.some(v => v.day === day && v.month === date.getMonth() && v.year === date.getFullYear());
  };

  const isPast = (day: number, date: Date) => {
    const target = new Date(date.getFullYear(), date.getMonth(), day);
    return target < today;
  };

  const isOccupied = (day: number, date: Date) => {
    return OCCUPIED_DATA.some(o => o.day === day && o.month === date.getMonth() && o.year === date.getFullYear());
  };

  const toggleVacationDay = (day: number) => {
    if (isPast(day, vacationDate) || isOccupied(day, vacationDate)) return;

    const month = vacationDate.getMonth();
    const year = vacationDate.getFullYear();

    setSelectedVacationDays(prev => {
      const exists = isDayInVacations(day, vacationDate);
      if (exists) {
        return prev.filter(v => !(v.day === day && v.month === month && v.year === year));
      } else {
        if (prev.length >= TOTAL_VACATION_LIMIT) return prev;
        return [...prev, { day, month, year }];
      }
    });
  };

  // Simplificamos renderCalendarDays para que solo maneje el modo 'select' (Vacaciones)
  const renderCalendarDays = (date: Date) => {
    const { firstDay, totalDays } = getDaysInMonth(date);
    const elements = [];

    for (let i = 0; i < firstDay; i++) {
      elements.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const past = isPast(d, date);
      const isToday = d === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

      const occupied = isOccupied(d, date);
      const selected = isDayInVacations(d, date);
      elements.push(
        <div
          key={d}
          className={`calendar-day selectable ${occupied ? 'occupied' : ''} ${selected ? 'selected' : ''} ${past ? 'past-day' : ''} ${isToday ? 'is-today' : ''}`}
          onClick={() => toggleVacationDay(d)}
        >
          <span className="day-number">{d}</span>
          {occupied && <span className="occupied-label">Ocupado</span>}
        </div>
      );
    }
    return elements;
  };

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
          
          <div className="calendar-legend-colored" style={{marginTop: '0.8rem', flexShrink: 0}}>
            <span className="leg-item"><i className="dot-del"></i> Lanzamiento</span>
            <span className="leg-item"><i className="dot-int"></i> Sync Interna</span>
            <span className="leg-item"><i className="dot-cli"></i> Estrategia</span>
          </div>
        </div>
      </div>

      <section className="intranet-info-footer">
        <div className="footer-list parchment-bg">
          <h3>Estrategia Q2</h3>
          <ul>
            <li>✦ Incrementar ventas un 15% en plataformas digitales</li>
            <li>✦ Optimizar rendimiento del servidor de descargas</li>
            <li>✦ Expandir la red de distribución logística</li>
          </ul>
        </div>
        <div className="footer-list parchment-bg">
          <h3>Hitos Alcanzados</h3>
          <ul>
            <li>✦ Récord de usuarios concurrentes en Enero</li>
            <li>✦ Integración exitosa con nuevas pasarelas</li>
            <li>✦ Reducción de tiempos de carga en la tienda un 30%</li>
          </ul>
        </div>
      </section>
    </>
  );

  return (
    <div className="intranet-sketch-layout intranet-full">
      {view === 'main' && (
        <header className="intranet-header">
          <h1>Bienvenido/a, {username}</h1>
        </header>
      )}

      {view === 'main' && renderMainView()}

      {view === 'rules' && <Normas setView={setView} />}

      {view === 'vacation' && (
        <Vacaciones
          setView={setView}
          vacationDate={vacationDate}
          changeMonth={changeMonth}
          MONTH_NAMES={MONTH_NAMES}
          TOTAL_VACATION_LIMIT={TOTAL_VACATION_LIMIT}
          selectedVacationDays={selectedVacationDays}
          renderCalendarDays={renderCalendarDays}
        />
      )}

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
    </div>
  );
};

export default IntranetPage;
