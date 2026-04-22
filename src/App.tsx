import { useState } from 'react';
import './App.css';

// Componentes
import LandingPage from './Landing/LandingPage';
import SelectionPage from './Selection-Cauldron/SelectionPage';
import ConfiguratorPage from './Adding-Ingredients/ConfiguratorPage';
import Navbar from './components/Navbar/Navbar';
import IntranetPage from './Intranet/IntranetPage';
import MyCauldronsPage from './MyCauldrons/MyCauldronsPage';
import LoginPage from './Login/LoginPage';

// Tipos y Datos
import { GENRES, RANDOM_COLORS } from './constants/gameData';
import { Genre, Step, OptionsMap, Page, Particle } from './types';

// Activos
import newBgImg from './assets/background.png';

/**
 * Función de utilidad para obtener un color aleatorio de la lista.
 */
function getRandomColor(): string {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

function App() {
  /* ==========================================================================
     ESTADOS DE LA APLICACIÓN
     ========================================================================== */
  
  const [page, setPage] = useState<Page>('home');
  const [currentStep, setCurrentStep] = useState<Step>('select-pot');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selections, setSelections] = useState<OptionsMap>({
    diseno: [],
    tematica: [],
    mecanicas: [],
    plataforma: []
  });

  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCounter, setParticleCounter] = useState(0);

  // Estados de Usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWorker, setIsWorker] = useState(true);

  /* ==========================================================================
     LÓGICA DE INTERACCIÓN
     ========================================================================== */

  const handleNavigate = (newPage: Page) => {
    setPage(newPage);
    if (newPage === 'creator') {
      setCurrentStep('select-pot');
    }
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentStep('configurator');
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

  /* ==========================================================================
     RENDERIZADO DE LAS PÁGINAS
     ========================================================================== */
  
  const renderContent = () => {
    switch (page) {
      case 'home':
        return <LandingPage setPage={setPage} setCurrentStep={setCurrentStep} isLoggedIn={isLoggedIn} />;
      
      case 'creator':
        return (
          <div className="creator-container">
            {currentStep === 'select-pot' && (
              <SelectionPage genres={GENRES} handleSelectGenre={handleSelectGenre} />
            )}
            {currentStep === 'configurator' && (
              <>
                <ConfiguratorPage 
                  newBgImg={newBgImg}
                  selections={selections}
                  particles={particles}
                  selectedGenre={selectedGenre}
                  isFusionReady={isFusionReady}
                  toggleOption={toggleOption}
                />
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
          </div>
        );

      case 'my-cauldrons':
        return <MyCauldronsPage />;

      case 'intranet':
        return <IntranetPage />;

      case 'login':
        return (
          <LoginPage onLogin={() => {
            setIsLoggedIn(true);
            setPage('home');
          }} />
        );

      default:
        return <LandingPage setPage={setPage} setCurrentStep={setCurrentStep} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        isWorker={isWorker} 
        onNavigate={handleNavigate} 
        isLoggedIn={isLoggedIn}
        onLoginToggle={() => {
          if (isLoggedIn) {
            setIsLoggedIn(false);
          } else {
            setPage('login');
          }
        }}
      />
      
      <div className="main-content" style={{ paddingTop: page === 'creator' || page === 'login' ? '0' : '70px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
