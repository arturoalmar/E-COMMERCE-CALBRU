import { useState } from 'react';
import './App.css';

/**
 * IMPORTACIÓN DE ACTIVOS (IMÁGENES)
 * Estos archivos se utilizan para la interfaz y la estética temática de la aplicación.
 */
import backgroundImg from './assets/background.png';
import spritesImg from './assets/Sprittes.png';
import proyectImg from './assets/proyect.png';
import cardsCauldron from './assets/cards_cauldron.png';
import jumpCauldron from './assets/jump__cauldron.png';
import partyCauldron from './assets/party_cauldron.png';
import survivorCauldron from './assets/survivor_cauldron.png';
import newBgImg from './assets/image.png';

/**
 * DEFINICIÓN DE TIPOS
 * Step: Define en qué paso del proceso de creación se encuentra el usuario.
 * OptionsMap: Estructura para almacenar las selecciones de configuración.
 * Genre: Interfaz para los géneros de juego disponibles (pociones base).
 * Particle: Interfaz para las partículas visuales que caen al caldero.
 */
type Step = 'select-pot' | 'configurator';
type OptionsMap = Record<string, string[]>;

interface Genre {
  id: string;
  name: string;
  description: string;
  image: string;
  hue: number; // Valor para rotación de color en CSS (filtro hue-rotate)
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

/**
 * DATOS DE GÉNEROS (POCIONES BASE)
 * Lista de los tipos de juegos que el usuario puede elegir para empezar.
 */
const GENRES: Genre[] = [
  {
    id: 'cards',
    name: 'Juego de Cartas',
    description: 'Construye tu mazo perfecto, crea sinergias y derrota a tus rivales con estrategia pura.',
    image: cardsCauldron,
    hue: 0
  },
  {
    id: 'platformer',
    name: 'Plataformas',
    description: 'Saltos precisos, niveles desafiantes y mundos vibrantes llenos de secretos.',
    image: jumpCauldron,
    hue: 200
  },
  {
    id: 'party',
    name: 'Estilo Mario Party',
    description: 'Minijuegos frenéticos, amigos traicioneros y mucha diversión multijugador local.',
    image: partyCauldron,
    hue: 60
  },
  {
    id: 'survivor',
    name: 'Estilo Vampire Survivor',
    description: 'Hordas interminables, mejoras auto-disparadas y caos en pantalla hasta el último segundo.',
    image: survivorCauldron,
    hue: 280
  },
];

// Colores aleatorios para las partículas que caen al caldero
const RANDOM_COLORS = ['#ab47bc', '#ffb300', '#00bcd4', '#ff5555'];

/**
 * Función de utilidad para obtener un color aleatorio de la lista.
 */
function getRandomColor(): string {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

type Page = 'home' | 'creator';

function App() {
  /* ==========================================================================
     ESTADOS DE LA APLICACIÓN
     ========================================================================== */
  
  // Controla si estamos en la Landing Page o en el Creador
  const [page, setPage] = useState<Page>('home');
  
  // Controla el paso actual dentro del creador (selección o configuración)
  const [currentStep, setCurrentStep] = useState<Step>('select-pot');
  
  // Almacena el género seleccionado por el usuario
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  // Almacena las selecciones de ingredientes en el configurador
  const [selections, setSelections] = useState<OptionsMap>({
    diseno: [],
    tematica: [],
    mecanicas: [],
    plataforma: []
  });

  // Gestión de partículas visuales
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCounter, setParticleCounter] = useState(0);

  /* ==========================================================================
     RENDERIZADO DE LA PÁGINA DE INICIO (LANDING PAGE)
     ========================================================================== */
  const renderHomePage = () => (
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

  /* ==========================================================================
     LÓGICA DE INTERACCIÓN
     ========================================================================== */

  /**
   * Maneja la selección de un género base.
   */
  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentStep('configurator');
    // Reiniciar selecciones al elegir un nuevo género
    setSelections({ diseno: [], tematica: [], mecanicas: [], plataforma: [] });
  };

  /**
   * Crea una partícula visual animada que cae hacia el caldero.
   */
  const createParticle = () => {
    const randomX = Math.random() * 120 - 60; // Desplazamiento horizontal aleatorio
    const randomY = -100; // Inicia por encima de la vista
    const color = getRandomColor();

    const newParticle: Particle = {
      id: particleCounter,
      x: randomX,
      y: randomY,
      color: color
    };

    setParticles(prev => [...prev, newParticle]);
    setParticleCounter(prev => prev + 1);

    // Eliminar la partícula después de que termine la animación (2 segundos)
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);
  };

  /**
   * Alterna la selección de una opción (ingrediente) en una categoría.
   */
  const toggleOption = (category: string, optionId: string) => {
    setSelections((prev) => {
      const currentSelections = prev[category];
      const isSelected = currentSelections.includes(optionId);

      const newSelections = isSelected
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId];

      // Disparar efecto de partícula solo al seleccionar (añadir ingrediente)
      if (!isSelected) {
        createParticle();
      }

      return { ...prev, [category]: newSelections };
    });
  };

  // Comprueba si el usuario ha seleccionado al menos un ingrediente para habilitar el botón final
  const isFusionReady =
    selections.diseno.length > 0 ||
    selections.tematica.length > 0 ||
    selections.mecanicas.length > 0 ||
    selections.plataforma.length > 0;

  /* ==========================================================================
     RENDERIZADO DEL PASO 1: SELECCIÓN DE POCIÓN BASE
     ========================================================================== */
  const renderSelectionStep = () => (
    <>
      <header>
        <h1>La Choza de la Bruja</h1>
        <p>Acércate al caldero... Selecciona la poción base de tu videojuego.</p>
      </header>
      <div className="genre-grid">
        {GENRES.map((genre) => (
          <div key={genre.id} className="genre-card">
            <h2>{genre.name}</h2>
            <button
              className="btn-select"
              onClick={() => handleSelectGenre(genre)}
            >
              Echar al Caldero
            </button>
            <img
              src={genre.image}
              alt={`${genre.name} caldero`}
              className="genre-image"
              style={{ filter: `hue-rotate(${genre.hue}deg) saturate(1.5)` }}
            />
            <p>{genre.description}</p>
          </div>
        ))}
      </div>
    </>
  );

  /* ==========================================================================
     COMPONENTES AUXILIARES DEL CONFIGURADOR
     ========================================================================== */

  /**
   * Genera una cuadrícula de opciones (estantería) para una categoría específica.
   */
  const generateOptionsGrid = (category: string, title: string, cornerClass: string) => {
    // Genera 12 opciones genéricas para llenar la cuadrícula (según el diseño original)
    const options = Array.from({ length: 12 }).map((_, i) => ({
      id: `${category}-${i + 1}`,
      label: `Opción ${i + 1}`
    }));

    return (
      <div className={`config-corner ${cornerClass}`}>
        <h3>{title}</h3>
        <div className="options-grid">
          {options.map((opt) => (
            <button
              key={opt.id}
              className={`option-btn ${selections[category].includes(opt.id) ? 'selected' : ''}`}
              onClick={() => toggleOption(category, opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  /* ==========================================================================
     RENDERIZADO DEL PASO 2: CONFIGURADOR (EL CALDERO)
     ========================================================================== */
  const renderConfiguratorStep = () => (
    <>
      {/* Fondo específico para el modo configurador */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${newBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1
        }}
      />
      <div className="configurator-layout">
        {/* Las 4 esquinas del configurador (estanterías de ingredientes) */}
        {generateOptionsGrid('diseno', 'Diseño Gráfico', 'corner-tl')}
        {generateOptionsGrid('tematica', 'Temática', 'corner-tr')}
        {generateOptionsGrid('mecanicas', 'Mecánicas Extra', 'corner-bl')}
        {generateOptionsGrid('plataforma', 'Banda Sonora', 'corner-br')}

        {/* El Dashboard Central: El Caldero Mágico */}
        <div className="center-dashboard">
          {/* Partículas visuales cayendo */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="falling-particle"
              style={{
                '--particle-color': particle.color,
                '--particle-x': `${particle.x}px`,
                '--particle-y': `${particle.y}px`
              } as React.CSSProperties & { '--particle-color': string; '--particle-x': string; '--particle-y': string }}
            />
          ))}

          <div>
            <h2>El Gran Caldero</h2>
            {selectedGenre && (
              <span className="selected-genre-badge">Poción Base: {selectedGenre.name}</span>
            )}
          </div>

          <div className="status-preview">
            {isFusionReady ? (
              <p>Los ingredientes reaccionan... ¡El conjuro está listo!</p>
            ) : (
              <p>Añade ingredientes de las estanterías (esquinas) a la mezcla...</p>
            )}
          </div>

          {/* Imagen del caldero con el color del género seleccionado */}
          {selectedGenre ? (
            <img
              src={selectedGenre.image}
              alt={`${selectedGenre.name} caldero`}
              className="cauldron-image"
              style={{ filter: `hue-rotate(${selectedGenre.hue}deg) saturate(1.5)` }}
            />
          ) : (
            <div className="cauldron-placeholder">
              Selecciona una base de juego para activar el caldero.
            </div>
          )}

          {/* Botón final de acción */}
          <button
            className="btn-fusionar"
            disabled={!isFusionReady}
            onClick={() => alert('¡Lanzando HECHIZO DE CREACIÓN!')}
          >
            ¡CONJURAR JUEGO!
          </button>
        </div>
      </div>
    </>
  );

  /* ==========================================================================
     ESTRUCTURA PRINCIPAL DEL COMPONENTE APP
     ========================================================================== */
  return (
    <div className="app-container">
      {/* Lógica de navegación condicional entre Home y Creador */}
      {page === 'home' && renderHomePage()}

      {page === 'creator' && (
        <>
          {/* Botón de retorno siempre visible en el modo creador */}
          <div className="page-header-row">
            <button className="btn-back-home" onClick={() => setPage('home')}>
              ← Volver a la página de inicio
            </button>
          </div>

          {/* Switch entre los pasos del creador */}
          {currentStep === 'select-pot' && renderSelectionStep()}
          {currentStep === 'configurator' && (
            <>
              {renderConfiguratorStep()}
              {/* Botón de retroceso al paso anterior */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 100, marginTop: 'calc(-2.5rem - 10px)', paddingBottom: '2rem' }}>
                <button
                  className="btn-back"
                  style={{ width: '100%', maxWidth: '400px', cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentStep('select-pot');
                    setSelectedGenre(null);
                  }}
                >
                  ← Volver a los calderos
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
