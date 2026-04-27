import React, { useState, useEffect, useCallback, useMemo } from 'react';
import news1 from '../assets/news1.png';
import news2 from '../assets/news2.png';
import news3 from '../assets/news3.png';

// Importación de sub-componentes reorganizados
import Normas from './Normas';
import Vacaciones from './Vacaciones';
import Teletrabajo from './Teletrabajo';

interface IntranetPageProps {
  username: string;
}

const NEWS_ITEMS = [
  { id: 1, title: 'Campaña de Ventas: Steam Summer Sale', img: news1, desc: 'Nuestros títulos principales entrarán en promoción global. Revisar el stock de keys y cupones de descuento.' },
  { id: 2, title: 'Migración a PostgreSQL AWS Finalizada', img: news2, desc: 'La infraestructura de ventas ahora es un 40% más rápida. Todo el historial de compras ha sido migrado y asegurado.' },
  { id: 3, title: 'Workshop: Optimización de Embudo de Conversión', img: news3, desc: 'Cómo mejorar el ratio de compra en la tienda usando análisis detallado de comportamiento de usuario.' }
];

const EVENTS = [
  { day: 2, month: 3, year: 2026, title: 'Cierre de Ejercicio Q1', type: 'internal' },
  { day: 10, month: 3, year: 2026, title: 'Lanzamiento: DLC Spells & Steel', type: 'delivery' },
  { day: 15, month: 3, year: 2026, title: 'Reunión con Inversores Europeos', type: 'client' },
  { day: 22, month: 3, year: 2026, title: 'Workshop: IA en NPCs', type: 'internal' },
  { day: 29, month: 3, year: 2026, title: 'Publicación de Parche v1.4', type: 'delivery' },
  { day: 5, month: 4, year: 2026, title: 'Kick-off: Proyecto Phoenix', type: 'internal' },
  { day: 14, month: 4, year: 2026, title: 'Demo Técnica: RayTracing v2', type: 'internal' },
  { day: 25, month: 4, year: 2026, title: 'Steam Strategy Weekend', type: 'client' },
  { day: 3, month: 5, year: 2026, title: 'Lanzamiento: Calbru Mobile Beta', type: 'delivery' }
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
  const [view, setView] = useState<'main' | 'rules' | 'vacation' | 'teleworking'>('main');
  const [currentNews, setCurrentNews] = useState(0);
  const [selectedVacationDays, setSelectedVacationDays] = useState<{ day: number, month: number, year: number }[]>([]);
  const [isManualPaused, setIsManualPaused] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [mainDate, setMainDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [vacationDate, setVacationDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const TOTAL_VACATION_LIMIT = 22;

  useEffect(() => {
    if (view !== 'main') return;
    const intervalTime = isManualPaused ? 10000 : 6000;
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % NEWS_ITEMS.length);
      if (isManualPaused) setIsManualPaused(false);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [view, isManualPaused]);

  const handleManualNav = useCallback((next: boolean) => {
    setIsManualPaused(true);
    setCurrentNews(prev => (next ? (prev + 1) % NEWS_ITEMS.length : (prev === 0 ? NEWS_ITEMS.length - 1 : prev - 1)));
  }, []);

  const changeMonth = (type: 'main' | 'vacation', direction: 'next' | 'prev') => {
    const setter = type === 'main' ? setMainDate : setVacationDate;
    setter(prev => {
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

  const renderCalendarDays = (date: Date, mode: 'display' | 'select') => {
    const { firstDay, totalDays } = getDaysInMonth(date);
    const elements = [];

    for (let i = 0; i < firstDay; i++) {
      elements.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const past = isPast(d, date);
      const isToday = d === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

      if (mode === 'display') {
        const event = EVENTS.find(e => e.day === d && e.month === date.getMonth() && e.year === date.getFullYear());
        elements.push(
          <div key={d} className={`calendar-day ${event ? 'has-event hover-trigger' : 'no-event-day'} ${past ? 'past-day' : ''} ${isToday ? 'is-today' : ''}`} title={event?.title}>
            <span className="day-number">{d}</span>
            {event && <span className={`event-marker marker-${event.type}`}></span>}
          </div>
        );
      } else {
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
    }
    return elements;
  };

  const renderMainView = () => (
    <>
      <section className="news-slider-dynamic">
        <button className="slider-btn prev" onClick={() => handleManualNav(false)}>❮</button>
        <div className="slider-wrapper">
          <div className="slider-track" style={{ transform: `translateX(-${currentNews * 100}%)` }}>
            {NEWS_ITEMS.map((item) => (
              <div className="news-slide" key={item.id}>
                <div className="news-image-container">
                  <img src={item.img} alt={item.title} />
                  <div className="news-overlay-gradient">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="slider-btn next" onClick={() => handleManualNav(true)}>❯</button>
      </section>

      <div className="intranet-grid-main">
        <section className="quick-links-sketch">
          <h2 className="section-title-witch">Gestión Corporativa</h2>
          <ul className="interactive-links">
            <li>
              <a className="intranet-action-link" href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430" target="_blank" rel="noreferrer">- Estatuto de los Trabajadores</a>
              <p className="link-description">Marco legal de derechos y deberes.</p>
            </li>
            <li>
              <a className="intranet-action-link" href="https://www.confemetal.es/que-hacemos/negociacion-colectiva/convenios-provinciales/" target="_blank" rel="noreferrer">- Convenio del Metal</a>
              <p className="link-description">Normativa específica del sector.</p>
            </li>
            <li>
              <button className="intranet-action-link" onClick={() => setView('rules')}>- Normas y Código de Conducta</button>
              <p className="link-description">Guía de comportamiento y protocolos.</p>
            </li>
            <li>
              <button className="intranet-action-link" onClick={() => setView('vacation')}>- Solicitud de Vacaciones</button>
              <p className="link-description">Gestión de días libres anuales.</p>
            </li>
            <li>
              <button className="intranet-action-link" onClick={() => setView('teleworking')}>- Política de Teletrabajo</button>
              <p className="link-description">Condiciones para trabajo remoto.</p>
            </li>
          </ul>
        </section>

        <section className="calendar-sketch functional-calendar">
          <div className="calendar-header-nav">
            <button className="nav-btn" onClick={() => changeMonth('main', 'prev')}>❮</button>
            <h3>{MONTH_NAMES[mainDate.getMonth()]} {mainDate.getFullYear()}</h3>
            <button className="nav-btn" onClick={() => changeMonth('main', 'next')}>❯</button>
          </div>
          <div className="calendar-grid-header">
            <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
          </div>
          <div className="calendar-grid-body">
            {renderCalendarDays(mainDate, 'display')}
          </div>
          <div className="calendar-legend-colored">
            <span className="leg-item"><i className="dot-del"></i> Lanzamiento</span>
            <span className="leg-item"><i className="dot-int"></i> Sync Interna</span>
            <span className="leg-item"><i className="dot-cli"></i> Estrategia</span>
          </div>
        </section>
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
