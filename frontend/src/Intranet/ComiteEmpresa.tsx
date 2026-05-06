/**
 * 📄 ARCHIVO: ComiteEmpresa.tsx
 * 📝 DESCRIPCIÓN: Archivo del proyecto.
 */

// ComiteEmpresa.tsx
// Vista del Comité de Empresa con pestañas para información, normativa y objetivos.

import React, { useState } from 'react';

// SECCIÓN: Definición de datos/propiedades
interface ComiteEmpresaProps {
  setView: (view: 'main' | 'rules' | 'vacation' | 'teleworking' | 'committee') => void;
}

// SECCIÓN: Componente o Función lógica
const ComiteEmpresa: React.FC<ComiteEmpresaProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'legal' | 'goals'>('info');

// SECCIÓN: Renderizado visual
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
          className={`tab-btn-witch ${activeTab === 'goals' ? 'active' : ''}`}
          onClick={() => setActiveTab('goals')}
        >
          <span>🎯</span> Logros y Metas
        </button>
      </div>

      <div className="committee-content vertical-stack full-width-content">
        
        {/* TABS: EL COMITÉ */}
        {activeTab === 'info' && (
          <div className="tab-pane fade-in-active">
            <section className="committee-section pro-card">
              <h3>¿Quiénes somos?</h3>
              <div className="who-we-are-content">
                <p className="intro-text">
                  El Comité de Empresa es el órgano representativo y colegiado del conjunto de los trabajadores en Calbru Games para la defensa de sus intereses. Somos un equipo elegido democráticamente por ti y para ti, comprometidos con el bienestar y los derechos de todos los miembros del estudio.
                </p>
                <div className="mission-vision-grid">
                  <div className="mv-card">
                    <span className="mv-icon">🛡️</span>
                    <h4>Misión</h4>
                    <p>Proteger y mejorar los derechos laborales, asegurando un entorno de trabajo justo, seguro y equitativo para todos los desarrolladores y staff.</p>
                  </div>
                  <div className="mv-card">
                    <span className="mv-icon">🤝</span>
                    <h4>Visión</h4>
                    <p>Ser un puente transparente y eficaz entre la dirección y los empleados, fomentando el diálogo constructivo y el progreso colectivo.</p>
                  </div>
                  <div className="mv-card">
                    <span className="mv-icon">⚖️</span>
                    <h4>Valores</h4>
                    <p>Independencia, transparencia, solidaridad, y compromiso inquebrantable con la legalidad y el bienestar de la plantilla.</p>
                  </div>
                </div>
                <p className="closing-text">
                  <strong>¿Para qué servimos?</strong> Actuamos como interlocutores ante la dirección, negociamos convenios, vigilamos el cumplimiento de las normas laborales y de seguridad, y te asesoramos de forma confidencial en cualquier duda sobre tus derechos y deberes.
                </p>
              </div>
            </section>

            <section className="committee-section pro-card">
              <h3>Organigrama del Comité</h3>
              <div className="org-chart-witch enhanced-org">
                <div className="org-level">
                  <div className="org-node leader">
                    <div className="org-avatar er">ER</div>
                    <h4>Presidente</h4>
                    <p>Elena Rúnica</p>
                    <span className="org-dept">Desarrollo Core</span>
                  </div>
                </div>
                <div className="org-connect-vertical"></div>
                <div className="org-horizontal-line"></div>
                <div className="org-level org-row-multi">
                  <div className="org-branch">
                    <div className="org-connect-vertical short"></div>
                    <div className="org-node">
                      <div className="org-avatar ma">MA</div>
                      <h4>Secretario</h4>
                      <p>Marcos Alquimia</p>
                      <span className="org-dept">Arte 3D</span>
                    </div>
                  </div>
                  <div className="org-branch">
                    <div className="org-connect-vertical short"></div>
                    <div className="org-node">
                      <div className="org-avatar ld">LD</div>
                      <h4>Vocal Prevención</h4>
                      <p>Lucía Dragon</p>
                      <span className="org-dept">QA</span>
                    </div>
                  </div>
                  <div className="org-branch">
                    <div className="org-connect-vertical short"></div>
                    <div className="org-node">
                      <div className="org-avatar tf">TF</div>
                      <h4>Vocal Igualdad</h4>
                      <p>Tomás Forja</p>
                      <span className="org-dept">Narrativa</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TABS: NORMAS Y LEYES */}
        {activeTab === 'legal' && (
          <div className="tab-pane fade-in-active">
            <section className="committee-section">
              <h3>Píldoras Informativas: Normativa Laboral TIC</h3>
              <div className="info-pills-grid">
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

        {/* TABS: LOGROS Y METAS */}
        {activeTab === 'goals' && (
          <div className="tab-pane fade-in-active">
            
            <section className="committee-section">
              <h3 className="section-title-witch" style={{fontSize: '2rem', textAlign: 'left', borderBottom: 'none'}}>🏆 Acuerdos Históricos Conseguidos</h3>
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
                    <p>Establecimiento de un plus mensual de 50€ para compensación de gastos (luz, internet) y renovación del báculo (equipo portátil) cada 3 años.</p>
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
              <h3 className="section-title-witch" style={{fontSize: '2rem', textAlign: 'left', borderBottom: 'none', color: '#d7b3ff'}}>🚀 Objetivos Estratégicos 2026</h3>
              <p className="intro-text" style={{marginBottom: '2rem'}}>Estas son nuestras batallas actuales en la mesa de negociación. Necesitamos vuestro apoyo en las asambleas para sacarlas adelante.</p>
              
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
                    <h4>Renovación de Zonas de Descanso (Las Tabernas)</h4>
                    <span className="goal-status close">Aprobado - Q2</span>
                  </div>
                  <p>Renovación total de sillas, máquinas de café premium gratuitas y adquisición de nuevas consolas para las zonas comunes del estudio.</p>
                  <div className="progress-container">
                    <div className="progress-bar" style={{width: '90%', background: 'linear-gradient(90deg, #28a745, #5cb85c)'}}></div>
                  </div>
                  <span className="progress-text">Fase 3 de 3: Pendiente de instalación por el proveedor.</span>
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
