import React from 'react';

interface VacacionesProps {
    setView: (view: 'main' | 'rules' | 'vacation' | 'teleworking') => void;
    vacationDate: Date;
    changeMonth: (direction: 'next' | 'prev') => void;
    MONTH_NAMES: string[];
    TOTAL_VACATION_LIMIT: number;
    selectedVacationDays: { day: number, month: number, year: number }[];
    renderCalendarDays: (date: Date) => React.ReactNode;
}

const Vacaciones: React.FC<VacacionesProps> = ({
    setView,
    vacationDate,
    changeMonth,
    MONTH_NAMES,
    TOTAL_VACATION_LIMIT,
    selectedVacationDays,
    renderCalendarDays
}) => {
    return (
        <div className="sub-view-panel parchment-bg detailed-view">
            {/* Botón de volver por encima de todo */}
            <div className="top-navigation-area">
                <button className="intranet-action-link back-btn-top" onClick={() => setView('main')}>
                    ← Volver al Panel
                </button>
            </div>

            <div className="sub-view-header modern-grid-header">
                <div className="header-side-left">
                    {/* Espacio ahora vacío porque el botón subió */}
                </div>
                
                <h2 className="section-title-witch centered-white-title">
                    Solicitud de Vacaciones
                </h2>

                <div className="header-side-right">
                    {/* Espacio balanceado */}
                </div>
            </div>

            <div className="vacation-main-layout">
                <div className="vacation-stats-panel">
                    <div className="stat-circle">
                        <span className="big-num">{TOTAL_VACATION_LIMIT - selectedVacationDays.length}</span>
                        <span>Días</span>
                    </div>
                    <p className="stat-desc">Días elegidos: {selectedVacationDays.length} / {TOTAL_VACATION_LIMIT}</p>
                    <button className="intranet-confirm-btn" onClick={() => alert('¡Solicitud enviada a RRHH!')}>Enviar Solicitud</button>
                </div>
                
                <div className="vacation-calendar-wrapper">
                    <div className="calendar-header-nav">
                        <button className="nav-btn" onClick={() => changeMonth('prev')}>❮</button>
                        <h3>{MONTH_NAMES[vacationDate.getMonth()]} {vacationDate.getFullYear()}</h3>
                        <button className="nav-btn" onClick={() => changeMonth('next')}>❯</button>
                    </div>
                    <div className="calendar-grid-header">
                        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
                    </div>
                    <div className="calendar-grid-body vacation-selector fixed-format">
                        {renderCalendarDays(vacationDate)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vacaciones;
