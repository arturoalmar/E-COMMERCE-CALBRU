import React from 'react';

/**
 * IMPORTACIÓN DE ACTIVOS (IMÁGENES)
 * Al mover el código a una subcarpeta (Landing/), debemos subir un nivel (../) 
 * para encontrar la carpeta assets.
 */
import proyectImg from '../assets/proyect.png';
import spritesImg from '../assets/Sprittes.png';
import backgroundImg from '../assets/background.png';

/**
 * DEFINICIÓN DE PROPS
 * Necesitamos recibir estas funciones desde App.tsx para que los botones funcionen.
 */
interface LandingPageProps {
  setPage: (page: 'home' | 'creator') => void;
  setCurrentStep: (step: 'select-pot' | 'configurator') => void;
}

/**
 * COMPONENTE LandingPage
 * Todo el JSX debe estar envuelto en una función que lo devuelva (return).
 */
const LandingPage: React.FC<LandingPageProps> = ({ setPage, setCurrentStep }) => {
  return (
    <main className="homepage">
      {/* Sección Hero: Primera impresión con imagen de fondo y CTA principal */}
      <section
        className="homepage-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(9, 8, 20, 0.84), rgba(16, 8, 40, 0.96)), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-overlay">
          <div className="hero-copy">
            <p className="eyebrow">Bienvenido a Calbru Games</p>
            <h1>Crea videojuegos desde cero con estilo profesional.</h1>
            <p>
              Diseña propuestas jugables con una estética fuerte, prototipa rápidamente y presenta
              tu proyecto con un look preparado para impacto.
            </p>
            <button className="btn-cta" onClick={() => {
              setPage('creator');
              setCurrentStep('select-pot');
            }}>
              Ir al creador de juegos
            </button>

            {/* Tarjetas de estadísticas/características clave */}
            <div className="hero-highlights">
              <article className="stat-card">
                <strong>Editor visual</strong>
                <span>Control rápido de mecánicas, pantallas y flujo.</span>
              </article>
              <article className="stat-card">
                <strong>Motor potente</strong>
                <span>Prototipos fluidos con estética coherente y resultados reales.</span>
              </article>
              <article className="stat-card">
                <strong>Presentación lista</strong>
                <span>Rapidez en demos para mostrar ideas a clientes o pitch.</span>
              </article>
            </div>
          </div>

          <div className="hero-visual">
            <img src={proyectImg} alt="Producto destacado" />
          </div>
        </div>
      </section>

      {/* Sección Informativa: Qué hacemos */}
      <section className="homepage-section">
        <div className="text-block">
          <h2>Qué hacemos</h2>
          <p>
            Desarrollamos propuestas jugables claras y con estilo: desde juegos de cartas
            hasta plataformas y experiencias para grupos.
          </p>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Diseño de experiencia</h3>
              <p>Definimos mecánicas, progresión y factores de retención en cada prototipo.</p>
            </article>
            <article className="feature-card">
              <h3>Arte y estética</h3>
              <p>Proponemos paletas, tipografía y atmósferas con un aire serio y friki a la vez.</p>
            </article>
            <article className="feature-card">
              <h3>Prototipado rápido</h3>
              <p>Convertimos ideas en demos jugables con resultados visibles en poco tiempo.</p>
            </article>
          </div>
        </div>
        <div className="image-block">
          <img src={proyectImg} alt="Qué hacemos" />
        </div>
      </section>

      {/* Sección de Proceso: Cómo lo hacemos (Orden inverso en desktop) */}
      <section className="homepage-section homepage-section--reverse">
        <div className="image-block image-block--wide">
          <img src={spritesImg} alt="Cómo lo hacemos" />
        </div>
        <div className="text-block">
          <h2>Cómo lo hacemos</h2>
          <div className="process-list">
            <article className="process-step-simple">
              <span>1</span>
              <div>
                <h3>Entender la idea</h3>
                <p>Analizamos tu concepto para proponer una base poderosa y coherente.</p>
              </div>
            </article>
            <article className="process-step-simple">
              <span>2</span>
              <div>
                <h3>Crear el prototipo</h3>
                <p>Armar una demo funcional con mecánicas, temática y estética integradas.</p>
              </div>
            </article>
            <article className="process-step-simple">
              <span>3</span>
              <div>
                <h3>Mostrar resultados</h3>
                <p>Presentamos el trabajo con claridad para probarlo, iterar y convencer.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Panel Final de Llamada a la Acción (CTA) */}
      <section className="trial-panel">
        <h2>Pruébanos</h2>
        <p>
          Entra en el creador y crea una demo real. Selecciona una base, elige tu tema,
          añade mecánicas y escucha el resultado en tiempo real.
        </p>
        <button className="btn-cta" onClick={() => {
          setPage('creator');
          setCurrentStep('select-pot');
        }}>
          Comenzar demo
        </button>
      </section>
    </main>
  );
};

export default LandingPage;
