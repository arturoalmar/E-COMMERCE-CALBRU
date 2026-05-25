/**
 * 📄 ARCHIVO: ComiteEmpresa.tsx
 * 📝 DESCRIPCIÓN: Componente principal de la sección de Delegados de Personal.
 */

// ComiteEmpresa.tsx
// Vista de los Delegados de Personal con pestañas para información, normativa y logros.

import React, { useState } from 'react';
import tfgVideo from '../assets/TFG.mp4';
import arturoImg from '../assets/IMG_7846.jpg';
import joelImg from '../assets/IMG_7847.jpg';

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
          Delegados de Personal
        </h2>
        <div className="header-side-right"></div>
      </div>

      {/* Pestañas de Navegación */}
      <div className="committee-tabs-nav">
        <button 
          className={`tab-btn-witch ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <span>👥</span> Los Delegados
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
        
        {/* TABS: LOS DELEGADOS */}
        {activeTab === 'info' && (
          <div className="tab-pane fade-in-active">
            <div className="committee-video-container">
              <video controls width="100%">
                <source src={tfgVideo} type="video/mp4" />
                Tu navegador no soporta la reproducción de vídeo.
              </video>
            </div>

            <section className="committee-section pro-card">
              <h3>¿Quiénes somos?</h3>
              <div className="who-we-are-content who-intro-card">
                <p className="intro-text">
                  Los Delegados de Personal de The Hag's Cauldron representan a todo el equipo del estudio y trabajan para mantener un entorno laboral justo, transparente y saludable.
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
              <h3>Delegados de Personal</h3>
              <div className="delegates-grid">
                <article className="delegate-card">
                  <div className="delegate-photo-wrap">
                    <img src={arturoImg} alt="Foto de Arturo Almudi" className="delegate-photo" />
                  </div>
                  <div className="delegate-meta">
                    <h4>Arturo Almudi</h4>
                    <span className="delegate-role">Delegado de Personal</span>
                    <p>Encargado de recoger y presentar las necesidades del equipo, con foco en estabilidad laboral, conciliación y respeto a los derechos profesionales.</p>
                  </div>
                </article>
                <article className="delegate-card">
                  <div className="delegate-photo-wrap">
                    <img src={joelImg} alt="Foto de Joel Sánchez" className="delegate-photo" />
                  </div>
                  <div className="delegate-meta">
                    <h4>Joel Sánchez</h4>
                    <span className="delegate-role">Delegado de Personal</span>
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
                      <p>Antes de notificarte nada, la empresa debe seguir estos pasos en orden:<br></br>
                      Paso 1 — Consulta a la representación de los trabajadores (RLT)<br></br>
La empresa está obligada a informar y consultar previamente al comité de empresa o delegados de personal sobre la medida, sus causas y su alcance. Si se salta este trámite, la modificación puede ser declarada nula.<br></br>
Paso 2 — Trámite ante la Comisión Paritaria del convenio (si aplica)
Si la modificación afecta a condiciones reguladas en el propio Convenio del Metal de Aragón (jornada pactada en convenio, salario, etc.), la empresa debe comunicar a la Comisión Paritaria sectorial las causas y la exposición de motivos. Este trámite es obligatorio para que la medida tenga efectividad jurídica.<br></br>
Paso 3 — Notificación escrita individual
Solo después de los pasos anteriores, la empresa debe notificarte por escrito la decisión y sus motivos con un mínimo de 15 días de antelación a su efectividad.</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker step-2">⚖️</div>
                    <div className="timeline-content">
                      <h4>Tus 3 Opciones Legales</h4>
                      <ul className="options-list">
                        <li><span className="badge-green">Aceptar</span> Asumes las nuevas condiciones.</li>
                        <li><span className="badge-red">Rescindir</span> 
Si el cambio te perjudica, puedes extinguir tu contrato con derecho a prestación por desempleo y una indemnización de <strong>20 días por año </strong>trabajado (máximo 9 meses).</li>
                        <li><span className="badge-purple">Impugnar</span> Tienes <strong>20 días hábiles</strong> para demandar ante el Juzgado de lo Social si consideras la medida injustificada o si la empresa no ha seguido el procedimiento obligatorio descrito arriba..</li>
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
                  Es la sanción máxima. Se produce por un <strong>incumplimiento grave y culpable</strong> del trabajador. El Convenio del Metal de Aragón (arts. 61–63) concreta las causas en tres niveles: faltas leves, graves y muy graves. Solo las<strong> muy graves</strong> pueden dar lugar a despido disciplinario, e incluyen ausencias injustificadas reiteradas, indisciplina grave, acoso, disminución voluntaria y continuada del rendimiento, embriaguez habitual con repercusión en el trabajo, entre otras.
                </p>
<p> Requisito formal previo — Expediente contradictorio</p>
<p>Antes de ejecutar el despido, si eres delegado/a de personal o miembro del comité de empresa, la empresa está obligada a abrir un expediente contradictorio dándote audiencia. Si eres afiliado/a a un sindicato y la empresa lo sabe, debe notificar también a la sección sindical correspondiente. Si se omite este trámite, el despido puede ser declarado improcedente.</p>
                <div className="info-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
                  <div className="committee-info-box box-dark">
                    <h4>Consecuencias Inmediatas</h4>
                    <ul className="bullet-list">
                      <li>❌ <strong>Sin indemnización</strong> por despido. — si el despido es declarado procedente.</li>
                      <li>✅ Tienes derecho a <strong>Finiquito</strong> (vacaciones no disfrutadas, parte proporcional de pagas extra).</li>
                      <li>✅ Tienes derecho a solicitar el <strong>paro</strong> (si tienes la cotización necesaria).</li>
                    </ul>
                  </div>

                  <div className="committee-info-box box-action">
                    <h4>¿Qué hacer si ocurre?</h4>
                    <div className="action-step">
                      <span className="action-num">1</span>
                      <p>  <strong>Firma la carta añadiendo "NO CONFORME" y la fecha real de recepción. </strong> 
Esto no implica aceptar el despido ni sus causas. Solo deja constancia de que la recibiste y preserva tus derechos. Si la empresa no te entrega carta escrita con causa concreta, el despido es automáticamente improcedente.</p>
                    </div>
                    <div className="action-step">
                      <span className="action-num">2</span>
                      <p><strong>Comprueba que la carta de despido especifica los hechos y la fecha de efectos.</strong>
El convenio y el ET exigen que la comunicación sea escrita y detalle los hechos que motivan el despido. Una carta vaga o sin fecha de efectos puede ser impugnable por defecto de forma.</p>
                    </div>
                    <div className="action-step">
                      <span className="action-num">3</span>
                      <p><strong>Solicita asistencia a los Delegados de Personal o a un abogado laboralista de inmediato.</strong></p>
                    </div>
                    <div className="action-step">
                      <span className="action-num">4</span>
                      <p><strong>Tienes 20 días hábiles</strong> (sin contar sábados, domingos ni festivos) para presentar papeleta de conciliación ante el SAMA (Servicio Aragonés de Mediación y Arbitraje) e impugnar el despido ante el Juzgado de lo Social. Este plazo es de caducidad: si se pasa, pierdes el derecho.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* TABS: LOGROS Y OBJETIVOS DE LOS DELEGADOS */}
        {activeTab === 'copy' && (
          <div className="tab-pane fade-in-active">
            
            <section className="committee-section">
              <h3 className="section-title-witch" style={{fontSize: '2rem', textAlign: 'left', borderBottom: 'none'}}>🏆 Acuerdos Históricos Conseguidos por los Delegados de Personal</h3>
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
              <h3 className="section-title-witch" style={{fontSize: '2rem', textAlign: 'left', borderBottom: 'none', color: '#d7b3ff'}}>🚀 Iniciativas de los Delegados de Personal en Marcha</h3>
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