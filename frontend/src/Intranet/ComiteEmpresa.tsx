/**
 * 📄 ARCHIVO: ComiteEmpresa.tsx
 * 📝 DESCRIPCIÓN: Componente principal de la sección del Comité de Empresa.
 */

// ComiteEmpresa.tsx
// Vista del Comité de Empresa con pestañas para información, normativa y objetivos.

import React, { useState } from 'react';

// SECCIÓN: Definición de datos/propiedades
interface ComiteEmpresaProps {
  setView: (view: 'main' | 'rules' | 'teleworking' | 'committee') => void;
}

// SECCIÓN: Componente o Función lógica
const ComiteEmpresa: React.FC<ComiteEmpresaProps> = ({ setView: _setView }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'legal' | 'copy'>('info');

// SECCIÓN: Renderizado visual
  return (
    <div className="sub-view-panel parchment-bg detailed-view">
      <div className="sub-view-header modern-grid-header">
        <div className="header-side-left"></div>
        <h2 className="section-title-witch centered-white-title">
          Comité de Empresa
        </h2>
        <div className="header-side-right"></div>
      </div>

      {/* Pestañas de Navegación */}
      <div className="committee-tabs-nav">
        <button 
          className={`tab-btn-witch ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <span>👥</span> El Comité
        </button>
        <button 
          className={`tab-btn-witch ${activeTab === 'legal' ? 'active' : ''}`}
          onClick={() => setActiveTab('legal')}
        >
          <span>⚖️</span> Normas y Leyes
        </button>
        <button 
          className={`tab-btn-witch ${activeTab === 'copy' ? 'active' : ''}`}
          onClick={() => setActiveTab('copy')}
        >
          <span>🏆</span> Logros y Objetivos
        </button>
      </div>

      <div className="committee-content vertical-stack full-width-content">
        
        {/* TABS: EL COMITÉ */}
        {activeTab === 'info' && (
          <div className="tab-pane fade-in-active">
            <div className="committee-video-container">
              <div className="video-placeholder">
                <div className="video-play-button">▶</div>
                <p className="video-text">Vídeo Explicatorio del Comité de Empresa</p>
              </div>
            </div>

            <section className="committee-section pro-card">
              <h3>¿Quiénes somos?</h3>
              <div className="who-we-are-content who-intro-card">
                <p className="intro-text">
                  El Comité de Empresa de The Hag's Cauldron representa a todo el equipo del estudio y trabaja para mantener un entorno laboral justo, transparente y saludable.
Como delegados, escuchamos las necesidades de la plantilla y actuamos como enlace directo con la dirección para mejorar el día a día del equipo.
                </p>
                <div className="who-summary-grid">
                  <div className="who-summary-box">
                    <h4>Delegados de Personal</h4>
                    <p>Somos dos representantes elegidos para apoyar a la plantilla en temas relacionados con condiciones laborales, organización, comunicación interna y bienestar dentro del entorno laboral.
Nuestro objetivo es que cualquier persona pueda expresar dudas, propuestas o preocupaciones con confianza.</p>
                  </div>
                  <div className="who-summary-box">
                    <h4>Representación Cercana</h4>
                    <p>Mantenemos una comunicación cercana con el equipo para trasladar sugerencias e inquietudes de forma clara y constructiva.
También ayudamos a informar sobre derechos laborales, procesos internos y acuerdos que afecten al estudio.</p>
                  </div>
                </div>
                <p className="closing-text">
                  <strong>¿Para qué servimos?</strong><br></br> Trabajamos para que Calbru Games siga siendo un lugar donde desarrollar videojuegos en un entorno profesional, creativo y respetuoso.
Buscamos favorecer la colaboración, la transparencia y unas condiciones laborales equilibradas para todo el equipo.
                </p>
              </div>
            </section>

            <section className="committee-section pro-card delegates-section">
              <h3>Delegados del Comité</h3>
              <div className="delegates-grid">
                <article className="delegate-card">
                  <div className="delegate-photo-wrap">
                    <img src="https://via.placeholder.com/320x220?text=Arturo+Almudi" alt="Foto de Arturo Almudi" className="delegate-photo" />
                  </div>
                  <div className="delegate-meta">
                    <h4>Arturo Almudi</h4>
                    <span className="delegate-role">Delegado del Comité</span>
                    <p>Encargado de recoger y presentar las necesidades del equipo, con foco en estabilidad laboral, conciliación y respeto a los derechos profesionales.</p>
                  </div>
                </article>
                <article className="delegate-card">
                  <div className="delegate-photo-wrap">
                    <img src="https://via.placeholder.com/320x220?text=Joel+S%C3%A1nchez" alt="Foto de Joel Sánchez" className="delegate-photo" />
                  </div>
                  <div className="delegate-meta">
                    <h4>Joel Sánchez</h4>
                    <span className="delegate-role">Delegado del Comité</span>
                    <p>Responsable de asegurar que el estudio cumple con las normas laborales y de defender tus derechos en los procesos de negociación y consulta interna.</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        )}

        {/* TABS: NORMAS Y LEYES */}
        {activeTab === 'legal' && (
          <div className="tab-pane fade-in-active">
            <section className="committee-section">
              <h3>Píldoras Informativas: </h3>
              <div className="info-pills-list">
                <div className="info-pill">
                  <h4><a href="https://www.boe.es/buscar/act.php?id=BOE-A-2021-11472" target="_blank" rel="noreferrer" style={{color: '#ffaa00', textDecoration: 'none'}}>Ley de Teletrabajo</a></h4>
                  <p>Regula el trabajo a distancia. Si trabajas más del 30% en remoto, tienes derecho a la compensación de gastos y dotación de equipos.</p>
                </div>
                <div className="info-pill">
                  <h4><a href="https://www.boe.es/buscar/act.php?id=BOE-A-1997-8671" target="_blank" rel="noreferrer" style={{color: '#ffaa00', textDecoration: 'none'}}>Riesgos Laborales: PVD</a></h4>
                  <p>Prevención de Riesgos con Pantallas de Visualización de Datos. Tienes derecho a pausas periódicas y revisiones oftalmológicas a cargo de la empresa.</p>
                </div>
                <div className="info-pill">
                  <h4><a href="https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930" target="_blank" rel="noreferrer" style={{color: '#ffaa00', textDecoration: 'none'}}>Propiedad Intelectual</a></h4>
                  <p>El código y los diseños creados durante tu jornada pertenecen a la empresa, pero conservas el derecho moral de reconocimiento de autoría en obras relevantes.</p>
                </div>
              </div>
            </section>

            <div className="infographics-container">
              <section className="committee-section infographic-card premium-info-card">
                <div className="info-card-header">
                  <span className="info-icon">📜</span>
                  <div>
                    <h3>Modificación Sustancial de Condiciones</h3>
                    <span className="legal-ref">Artículo 41 - Estatuto de los Trabajadores</span>
                  </div>
                </div>
                
                <p className="info-intro">
                  La empresa puede modificar tu jornada, horario, turnos, remuneración o funciones si existen <strong>probadas razones económicas, técnicas, organizativas o de producción (ETOP)</strong>.
                </p>

                <div className="timeline-witch">
                  <div className="timeline-item">
                    <div className="timeline-marker step-1">15</div>
                    <div className="timeline-content">
                      <h4>Preaviso Obligatorio</h4>
                      <p>La empresa debe notificarte por escrito la decisión y los motivos con un mínimo de <strong>15 días de antelación</strong> a su efectividad.</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker step-2">⚖️</div>
                    <div className="timeline-content">
                      <h4>Tus 3 Opciones Legales</h4>
                      <ul className="options-list">
                        <li><span className="badge-green">Aceptar</span> Asumes las nuevas condiciones.</li>
                        <li><span className="badge-red">Rescindir</span> Si el cambio te perjudica, puedes extinguir tu contrato con derecho a paro y una indemnización de <strong>20 días por año</strong> trabajado (máx. 9 meses).</li>
                        <li><span className="badge-purple">Impugnar</span> Tienes <strong>20 días hábiles</strong> para demandar ante el Juzgado de lo Social si consideras la medida injustificada.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className="committee-section infographic-card premium-info-card alert-card">
                <div className="info-card-header">
                  <span className="info-icon alert-icon">⚠️</span>
                  <div>
                    <h3>Despido Disciplinario</h3>
                    <span className="legal-ref">Artículo 54 - Estatuto de los Trabajadores</span>
                  </div>
                </div>

                <p className="info-intro">
                  Es la sanción máxima. Se produce por un <strong>incumplimiento grave y culpable</strong> del trabajador (ausencias injustificadas, indisciplina, acoso, disminución voluntaria del rendimiento, etc.).
                </p>

                <div className="info-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
                  <div className="committee-info-box box-dark">
                    <h4>Consecuencias Inmediatas</h4>
                    <ul className="bullet-list">
                      <li>❌ <strong>Sin indemnización</strong> por despido.</li>
                      <li>✅ Tienes derecho a <strong>Finiquito</strong> (vacaciones no disfrutadas, parte proporcional de pagas extra).</li>
                      <li>✅ Tienes derecho a solicitar el <strong>paro</strong> (si tienes la cotización necesaria).</li>
                    </ul>
                  </div>

                  <div className="committee-info-box box-action">
                    <h4>¿Qué hacer si ocurre?</h4>
                    <div className="action-step">
                      <span className="action-num">1</span>
                      <p>Firma la carta añadiendo <strong>"NO CONFORME"</strong> y la fecha real de recepción. Esto no implica rechazar el despido, solo salva tus derechos.</p>
                    </div>
                    <div className="action-step">
                      <span className="action-num">2</span>
                      <p>Solicita inmediatamente asistencia al <strong>Comité de Empresa</strong> o a un abogado laboralista.</p>
                    </div>
                    <div className="action-step">
                      <span className="action-num">3</span>
                      <p>Tienes <strong>20 días hábiles</strong> (sin contar findes ni festivos) para presentar papeleta de conciliación e impugnar el despido.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* TABS: COPIA DE NORMAS - LOGROS DEL COMITÉ */}
        {activeTab === 'copy' && (
          <div className="tab-pane fade-in-active">
            
            <section className="committee-section">
              <h3 className="section-title-witch" style={{fontSize: '2rem', textAlign: 'left', borderBottom: 'none'}}>🏆 Acuerdos Históricos Conseguidos por el Comité</h3>
              <p className="intro-text" style={{marginBottom: '2rem'}}>Estos son los logros más importantes que hemos conseguido para mejorar las condiciones laborales de todos los trabajadores.</p>
              <div className="achievements-grid">
                <div className="achievement-card">
                  <div className="ach-icon">🌞</div>
                  <div className="ach-content">
                    <h4>Jornada Intensiva Ampliada</h4>
                    <span className="ach-date">Acuerdo de Mayo 2024</span>
                    <p>Logramos extender la jornada de verano (8:00 - 15:00) a todo el mes de Septiembre, ganando un mes extra de conciliación frente al convenio estatal.</p>
                  </div>
                </div>
                
                <div className="achievement-card">
                  <div className="ach-icon">💻</div>
                  <div className="ach-content">
                    <h4>Plus de Teletrabajo TIC</h4>
                    <span className="ach-date">Acuerdo de Enero 2025</span>
                    <p>Establecimiento de un plus mensual de 50€ para compensación de gastos (luz, internet) y renovación del equipo portátil cada 3 años.</p>
                  </div>
                </div>

                <div className="achievement-card">
                  <div className="ach-icon">❤️</div>
                  <div className="ach-content">
                    <h4>Protocolo de Conciliación</h4>
                    <span className="ach-date">Acuerdo de Noviembre 2025</span>
                    <p>Ampliación de los permisos retribuidos por enfermedad de familiares directos y flexibilidad horaria de entrada/salida de hasta 2 horas.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="committee-section" style={{marginTop: '4rem'}}>
              <h3 className="section-title-witch" style={{fontSize: '2rem', textAlign: 'left', borderBottom: 'none', color: '#d7b3ff'}}>🚀 Iniciativas del Comité en Marcha</h3>
              <p className="intro-text" style={{marginBottom: '2rem'}}>Estas son las iniciativas que estamos impulsando actualmente para seguir mejorando las condiciones laborales.</p>
              
              <div className="goals-timeline">
                <div className="goal-pro-card">
                  <div className="goal-header">
                    <h4>Semana Laboral de 4 Días (32h)</h4>
                    <span className="goal-status in-progress">En Negociación</span>
                  </div>
                  <p>Implementación progresiva de la jornada de 4 días sin reducción salarial. Empezando por un viernes libre cada dos semanas en Q3.</p>
                  <div className="progress-container">
                    <div className="progress-bar" style={{width: '60%', background: 'linear-gradient(90deg, #8c5cff, #d7b3ff)'}}></div>
                  </div>
                  <span className="progress-text">Fase 2 de 3: Estudio de productividad finalizado.</span>
                </div>

                <div className="goal-pro-card">
                  <div className="goal-header">
                    <h4>Plan de Formación Continua 100% Financiado</h4>
                    <span className="goal-status blocked">Esperando Presupuesto</span>
                  </div>
                  <p>Bolsa de 1.500€ anuales por trabajador para cursos técnicos (Unidad, Unreal, IA, etc.) dentro del horario laboral.</p>
                  <div className="progress-container">
                    <div className="progress-bar" style={{width: '20%', background: 'linear-gradient(90deg, #ffaa00, #ffcc00)'}}></div>
                  </div>
                  <span className="progress-text">Fase 1 de 3: Propuesta presentada a RRHH.</span>
                </div>

                <div className="goal-pro-card">
                  <div className="goal-header">
                    <h4>Implementación de IA en Procesos Creativos</h4>
                    <span className="goal-status in-progress">En Desarrollo</span>
                  </div>
                  <p>Integración de herramientas de IA para acelerar procesos de diseño y narrativa, con formación especializada para todos los equipos.</p>
                  <div className="progress-container">
                    <div className="progress-bar" style={{width: '40%', background: 'linear-gradient(90deg, #8c5cff, #d7b3ff)'}}></div>
                  </div>
                  <span className="progress-text">Fase 1 de 2: Evaluación de herramientas completada.</span>
                </div>
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
};

export default ComiteEmpresa;
