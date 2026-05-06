/**
 * 📄 ARCHIVO: IntranetCalendar.tsx
 * 📝 DESCRIPCIÓN: Archivo del proyecto.
 */

// IntranetCalendar.tsx
// Componente de calendario interno para mostrar eventos corporativos y fechas clave.

import React, { useState, useMemo } from 'react';

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

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// SECCIÓN: Componente o Función lógica
const IntranetCalendar: React.FC = () => {
// SECCIÓN: Componente o Función lógica
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [mainDate, setMainDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

// SECCIÓN: Componente o Función lógica
  const changeMonth = (direction: 'next' | 'prev') => {
    setMainDate(prev => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return d;
    });
  };

// SECCIÓN: Componente o Función lógica
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, totalDays };
  };

// SECCIÓN: Componente o Función lógica
  const getEventsForDay = (day: number, date: Date) => {
    return EVENTS.filter(e => e.day === day && e.month === date.getMonth() && e.year === date.getFullYear());
  };

// SECCIÓN: Componente o Función lógica
  const renderCalendarDays = () => {
    const { firstDay, totalDays } = getDaysInMonth(mainDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const currentDayDate = new Date(mainDate.getFullYear(), mainDate.getMonth(), i);
      const isWeekend = currentDayDate.getDay() === 0 || currentDayDate.getDay() === 6;
      const isPast = currentDayDate < today;
      const isToday = currentDayDate.getTime() === today.getTime();
      const dayEvents = getEventsForDay(i, mainDate);

      let classes = "calendar-day";
      if (isWeekend) classes += " weekend";
      if (isPast) classes += " past";
      if (isToday) classes += " today-marker";

      days.push(
        <div key={`day-${i}`} className={classes}>
          <span className="day-number">{i}</span>
          <div className="day-events-container">
            {dayEvents.map((ev, idx) => (
              <div key={idx} className={`day-event-pill ${ev.type}`} title={ev.title}>
                {ev.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

// SECCIÓN: Renderizado visual
  return (
    <section className="calendar-sketch functional-calendar">
      <div className="calendar-header-nav">
        <button className="nav-btn" onClick={() => changeMonth('prev')}>❮</button>
        <h3>{MONTH_NAMES[mainDate.getMonth()]} {mainDate.getFullYear()}</h3>
        <button className="nav-btn" onClick={() => changeMonth('next')}>❯</button>
      </div>
      <div className="calendar-grid-header">
        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
      </div>
      <div className="calendar-grid-body">
        {renderCalendarDays()}
      </div>
    </section>
  );
};

export default IntranetCalendar;
