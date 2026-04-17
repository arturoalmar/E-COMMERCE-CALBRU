import { useState } from 'react';
import './App.css';
import backgroundImg from './assets/background.png';
import spritesImg from './assets/Sprittes.png';
import proyectImg from './assets/proyect.png';
import cardsCauldron from './assets/cards_cauldron.png';
import jumpCauldron from './assets/jump__cauldron.png';
import partyCauldron from './assets/party_cauldron.png';
import survivorCauldron from './assets/survivor_cauldron.png';

type Step = 'select-pot' | 'configurator';
type OptionsMap = Record<string, string[]>;

interface Genre {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const GENRES: Genre[] = [
  {
    id: 'cards',
    name: 'Juego de Cartas',
    description: 'Construye tu mazo perfecto, crea sinergias y derrota a tus rivales con estrategia pura.',
    image: cardsCauldron
  },
  {
    id: 'platformer',
    name: 'Plataformas',
    description: 'Saltos precisos, niveles desafiantes y mundos vibrantes llenos de secretos.',
    image: jumpCauldron
  },
  {
    id: 'party',
    name: 'Estilo Mario Party',
    description: 'Minijuegos frenéticos, amigos traicioneros y mucha diversión multijugador local.',
    image: partyCauldron
  },
  {
    id: 'survivor',
    name: 'Estilo Vampire Survivor',
    description: 'Hordas interminables, mejoras auto-disparadas y caos en pantalla hasta el último segundo.',
    image: survivorCauldron
  },
];

const RANDOM_COLORS = ['#ab47bc', '#ffb300', '#00bcd4', '#ff5555'];

function getRandomColor(): string {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

type Page = 'home' | 'creator';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [currentStep, setCurrentStep] = useState<Step>('select-pot');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  // States to hold the selected options for each characteristic
  const [selections, setSelections] = useState<OptionsMap>({
    diseno: [],
    tematica: [],
    mecanicas: [],
    plataforma: []
  });

  // Particles falling into cauldron
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCounter, setParticleCounter] = useState(0);

  const renderHomePage = () => (
    <main className="homepage">
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

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentStep('configurator');
    // Reset selections on new genre
    setSelections({ diseno: [], tematica: [], mecanicas: [], plataforma: [] });
  };

  const createParticle = () => {
    const randomX = Math.random() * 120 - 60;
    const randomY = -100;
    const color = getRandomColor();
    
    const newParticle: Particle = {
      id: particleCounter,
      x: randomX,
      y: randomY,
      color: color
    };

    setParticles(prev => [...prev, newParticle]);
    setParticleCounter(prev => prev + 1);

    // Remove particle after animation (increased from 1500 to 2000ms)
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);
  };

  const toggleOption = (category: string, optionId: string) => {
    setSelections((prev) => {
      const currentSelections = prev[category];
      const isSelected = currentSelections.includes(optionId);
      
      const newSelections = isSelected
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId];

      // Create particle when selecting (not deselecting)
      if (!isSelected) {
        createParticle();
      }
        
      return { ...prev, [category]: newSelections };
    });
  };



  const isFusionReady = 
    selections.diseno.length > 0 || 
    selections.tematica.length > 0 ||
    selections.mecanicas.length > 0 ||
    selections.plataforma.length > 0;

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
            <img src={genre.image} alt={`${genre.name} caldero`} className="genre-image" />
            <p>{genre.description}</p>
          </div>
        ))}
      </div>
    </>
  );

  // Options mock generators (12 default items for the 4x3 grids)
  const generateOptionsGrid = (category: string, title: string, cornerClass: string) => {
    // Generates 12 generic option blocks matching the user's sketch layout
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

  const renderConfiguratorStep = () => (
    <div className="configurator-layout">
      {generateOptionsGrid('diseno', 'Diseño Gráfico', 'corner-tl')}
      {generateOptionsGrid('tematica', 'Temática', 'corner-tr')}
      {generateOptionsGrid('mecanicas', 'Mecánicas Extra', 'corner-bl')}
      {generateOptionsGrid('plataforma', 'Banda Sonora', 'corner-br')}

      <div className="center-dashboard">
        {/* Particles falling into cauldron */}
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

        {/* Cauldron image */}
        {selectedGenre ? (
          <img
            src={selectedGenre.image}
            alt={`${selectedGenre.name} caldero`}
            className="cauldron-image"
          />
        ) : (
          <div className="cauldron-placeholder">
            Selecciona una base de juego para activar el caldero.
          </div>
        )}

        <button 
          className="btn-fusionar" 
          disabled={!isFusionReady}
          onClick={() => alert('¡Lanzando HECHIZO DE CREACIÓN!')}
        >
          ¡CONJURAR JUEGO!
        </button>
      </div>
    </div>
  );



  return (
    <div className="app-container">
      {page === 'home' && renderHomePage()}

      {page === 'creator' && (
        <>
          <div className="page-header-row">
            <button className="btn-back-home" onClick={() => setPage('home')}>
              ← Volver a la página de inicio
            </button>
          </div>

          {currentStep === 'select-pot' && renderSelectionStep()}
          {currentStep === 'configurator' && (
            <>
              {renderConfiguratorStep()}
              <button 
                className="btn-back" 
                onClick={() => setCurrentStep('select-pot')}
              >
                ← Volver a los calderos
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
