import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

// Componentes
import LandingPage from './Landing/LandingPage';
import SelectionPage from './Selection-Cauldron/SelectionPage';
import ConfiguratorPage from './Adding-Ingredients/ConfiguratorPage';
import Navbar from './components/Navbar/Navbar';
import IntranetPage from './Intranet/IntranetPage';
import MyCauldronsPage from './MyCauldrons/MyCauldronsPage';
import LoginPage from './Login/LoginPage';
import Conocenos from './Conocenos/Conocenos';

// Tipos y Datos
import { GENRES, RANDOM_COLORS } from './constants/gameData';
import { Genre, Step, OptionsMap, Page, Particle } from './types';

// Activos
import newBgImg from './assets/background.png';

function getRandomColor(): string {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

function App() {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWorker] = useState(true);

  // Estados de transición
  const [transitionStatus, setTransitionStatus] = useState<'none' | 'exiting' | 'entering'>('none');
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('up');
  const nextPageRoute = useRef<{ p: Page; s: Step; g: Genre | null } | null>(null);

  const performTransition = useCallback((newPage: Page, newStep: Step = 'select-pot', newGenre: Genre | null = null) => {
    const isGoingToHome = newPage === 'home';
    const direction = isGoingToHome ? 'down' : 'up';
    
    setTransitionDirection(direction);
    setTransitionStatus('exiting');
    nextPageRoute.current = { p: newPage, s: newStep, g: newGenre };

    setTimeout(() => {
      if (nextPageRoute.current) {
        setPage(nextPageRoute.current.p);
        setCurrentStep(nextPageRoute.current.s);
        setSelectedGenre(nextPageRoute.current.g);
        window.history.pushState({ 
          page: nextPageRoute.current.p, 
          step: nextPageRoute.current.s, 
          genre: nextPageRoute.current.g 
        }, '');
      }
      setTransitionStatus('entering');
      
      setTimeout(() => {
        setTransitionStatus('none');
        nextPageRoute.current = null;
      }, 50); // Pequeño delay para resetear posición sin animación
    }, 800);
  }, []);

  const navigateTo = useCallback((newPage: Page, newStep: Step = 'select-pot', newGenre: Genre | null = null, shouldPush = true) => {
    if (shouldPush) {
      performTransition(newPage, newStep, newGenre);
    } else {
      setPage(newPage);
      setCurrentStep(newStep);
      setSelectedGenre(newGenre);
    }
  }, [performTransition]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const { page: p, step: s, genre: g } = event.state;
        navigateTo(p, s, g, false);
      } else {
        navigateTo('home', 'select-pot', null, false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.history.replaceState({ page, step: currentStep, genre: selectedGenre }, '');
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateTo, page, currentStep, selectedGenre]);

  const handleNavigate = (newPage: Page) => {
    navigateTo(newPage, 'select-pot', null);
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelections({ diseno: [], tematica: [], mecanicas: [], plataforma: [] });
    navigateTo('creator', 'configurator', genre);
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
      if (!isSelected) createParticle();
      return { ...prev, [category]: newSelections };
    });
  };

  const isFusionReady =
    selections.diseno.length > 0 ||
    selections.tematica.length > 0 ||
    selections.mecanicas.length > 0 ||
    selections.plataforma.length > 0;

  const renderContent = () => {
    switch (page) {
      case 'home':
        return (
          <LandingPage
            setPage={(p) => navigateTo(p as Page, 'select-pot', null)}
            isLoggedIn={isLoggedIn}
            isWorker={isWorker}
          />
        );
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
                    onClick={() => navigateTo('creator', 'select-pot', null)}
                  >
                    ← Volver a los calderos
                  </button>
                </div>
              </>
            )}
          </div>
        );
      case 'my-cauldrons': return <MyCauldronsPage />;
      case 'intranet': return <IntranetPage username={isLoggedIn ? 'Arturo Almar' : 'Visitante'} />;
      case 'conocenos': return <Conocenos onStartNow={() => navigateTo('creator')} />;
      case 'login':
        return (
          <LoginPage onLogin={() => {
            setIsLoggedIn(true);
            navigateTo('home');
          }} />
        );
      default:
        return (
          <LandingPage
            setPage={(p) => navigateTo(p as Page, 'select-pot', null)}
            isLoggedIn={isLoggedIn}
            isWorker={isWorker}
          />
        );
    }
  };

  return (
    <div className={`app-container transition-${transitionStatus} dir-${transitionDirection}`}>
      {page !== 'home' && (
        <Navbar
          isWorker={isWorker}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          hideMenuToggle={page === 'home'}
          onLoginToggle={() => {
            if (isLoggedIn) {
              setIsLoggedIn(false);
            } else {
              navigateTo('login');
            }
          }}
        />
      )}

      {page !== 'home' && (
        <button
          className="back-to-home-btn floating"
          onClick={() => navigateTo('home')}
          aria-label="Volver al inicio"
        >
          <span className="back-text">Back</span>
        </button>
      )}

      <div className="main-content" style={{ paddingTop: (page === 'home' || page === 'creator' || page === 'login') ? '0' : '70px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
