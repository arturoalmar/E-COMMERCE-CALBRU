/**
 * 📄 ARCHIVO: App.tsx
 * 📝 DESCRIPCIÓN: Componente principal que gestiona el estado global, la navegación y las transiciones.
 */

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
import MagicalAlert from './components/MagicalAlert/MagicalAlert';

// Tipos y Datos
import { GENRES, RANDOM_COLORS } from './constants/gameData';
import type { AttributeOptionsMap, ConfigCategory, Genre, Step, OptionsMap, Page, Particle } from './types';

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
    sonido: []
  });
  const [cauldronName, setCauldronName] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCounter, setParticleCounter] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number, username: string, email?: string } | null>(null);
  const [isWorker] = useState(true);
  const [attributeOptions, setAttributeOptions] = useState<AttributeOptionsMap>({
    diseno: [],
    tematica: [],
    mecanicas: [],
    sonido: []
  });

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'confirm';
    onConfirm: () => void;
  }>({
    isOpen: false,
    message: '',
    type: 'success',
    onConfirm: () => {}
  });

  const showMagicalAlert = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'confirm' = 'success',
    onConfirm: () => void = () => closeAlert()
  ) => {
    setAlertConfig({
      isOpen: true,
      message,
      type,
      onConfirm: () => {
        onConfirm();
        closeAlert();
      }
    });
  };

  const closeAlert = () => setAlertConfig(prev => ({ ...prev, isOpen: false }));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, username: payload.username });
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  useEffect(() => {
    const fetchAttributeOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/attributes');
        if (!response.ok) {
          throw new Error('Failed to load ingredient options');
        }
        const data: Array<{ id: string; label: string; categoria: string }> = await response.json();
        const grouped: AttributeOptionsMap = {
          diseno: [],
          tematica: [],
          mecanicas: [],
          sonido: []
        };

        data.forEach((item) => {
          // La BD devuelve 'diseño' (con ñ) pero el mapa usa 'diseno' (sin ñ)
          const normalized = item.categoria === 'diseño' ? 'diseno' : item.categoria;
          const category = normalized as ConfigCategory;
          if (grouped[category]) {
            grouped[category].push({ id: item.id, label: item.label, categoria: category });
          }
        });

        setAttributeOptions(grouped);
      } catch (error) {
        console.error('Error loading attribute options:', error);
      }
    };

    fetchAttributeOptions();
  }, []);

  const [transitionStatus, setTransitionStatus] = useState<'none' | 'exiting' | 'entering'>('none');
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('up');
  const [potionSplash, setPotionSplash] = useState<'idle' | 'splatter' | 'slide'>('idle');
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
      }, 50);
    }, 450);
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

  useEffect(() => {
    const handleSplash = () => {
      setPotionSplash('splatter');
      setTimeout(() => setPotionSplash('slide'), 1200);
      setTimeout(() => setPotionSplash('idle'), 2200);
    };
    window.addEventListener('potion-splash', handleSplash);
    return () => window.removeEventListener('potion-splash', handleSplash);
  }, []);

  useEffect(() => {
    if (page === 'home') {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  }, [page]);

  const handleNavigate = (newPage: Page) => {
    navigateTo(newPage, 'select-pot', null);
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelections({ diseno: [], tematica: [], mecanicas: [], sonido: [] });
    setCauldronName('');
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

  const toggleOption = (category: ConfigCategory, optionId: string) => {
    setSelections((prev) => {
      const currentSelections = prev[category] ?? [];
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
    selections.sonido.length > 0;

  const handleSaveCauldron = async () => {
    if (!isLoggedIn) {
      showMagicalAlert('You must be a registered apprentice to forge cauldrons!', 'warning', () => navigateTo('login'));
      return;
    }

    const token = localStorage.getItem('token');
    const nombre = cauldronName.trim() || `Poción de ${selectedGenre?.name || 'Misterio'}`;
    const atributos = Object.entries(selections).flatMap(([category, ids]) =>
      ids.map(id =>
        attributeOptions[category as ConfigCategory]?.find(option => option.id === id)?.label || id
      )
    );
    const baseUrl = 'http://localhost:5000';
    const genreNameMap: Record<string, string> = {
      Cards: 'Juego de Cartas',
      Platformer: 'Plataformas',
      Party: 'Estilo Mario Party',
      Autoshooter: 'Estilo Vampire Survivor'
    };
    const tipoNombre = genreNameMap[selectedGenre?.name || ''] || selectedGenre?.name || 'Desconocido';

    try {
      const response = await fetch(`${baseUrl}/api/cauldrons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          tipo_nombre: tipoNombre,
          genre: selectedGenre?.name || 'Unknown',
          atributos: atributos,
          estado: 'pendiente',
          precio: 0,
          config_ia: `Configuración para ${selectedGenre?.name} con ingredientes: ${atributos.join(', ')}`
        })
      });

      if (response.ok) {
        showMagicalAlert('Cauldron successfully forged! Saved in your grimoire.', 'success', () => navigateTo('my-cauldrons'));
      } else {
        const errorBody = await response.text();
        console.error('Failed to save cauldron:', response.status, errorBody);
        showMagicalAlert('The cauldron has exploded... (Error saving)', 'error');
      }
    } catch (err) {
      console.error('Error al crear caldero:', err);
      showMagicalAlert('Connection error with the wizard\'s tower.', 'error');
    }
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return (
          <LandingPage
            setPage={(p) => navigateTo(p as Page, 'select-pot', null)}
            isLoggedIn={isLoggedIn}
            user={user}
            isWorker={isWorker}
            onLogout={() => {
              setIsLoggedIn(false);
              setUser(null);
              localStorage.removeItem('token');
            }}
          />
        );
      case 'creator':
        return (
          <div className="creator-container">
            {currentStep === 'select-pot' && (
              <SelectionPage
                genres={GENRES}
                handleSelectGenre={handleSelectGenre}
                onBack={() => navigateTo('home')}
              />
            )}
            {currentStep === 'configurator' && (
              <ConfiguratorPage
                selections={selections}
                particles={particles}
                selectedGenre={selectedGenre}
                isFusionReady={isFusionReady}
                toggleOption={toggleOption}
                onBack={() => navigateTo('creator', 'select-pot', null)}
                cauldronName={cauldronName}
                onCauldronNameChange={setCauldronName}
                onSave={handleSaveCauldron}
                onCreateGame={handleSaveCauldron}
                attributeOptions={attributeOptions}
              />
            )}
          </div>
        );
      case 'my-cauldrons':
        return (
          <MyCauldronsPage
            onCreateNew={() => navigateTo('creator')}
            showMagicalAlert={showMagicalAlert}
          />
        );
      case 'intranet': return <IntranetPage onBack={() => navigateTo('home')} />;
      case 'conocenos': return <Conocenos onStartNow={() => navigateTo('creator')} onBack={() => navigateTo('home')} />;
      case 'login':
        return (
          <LoginPage
            onLogin={(userData) => {
              setIsLoggedIn(true);
              setUser(userData);
              navigateTo('home');
            }}
            onBack={() => navigateTo('home')}
          />
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

  const isImmersiveMode = page === 'home' || page === 'creator' || page === 'login';
  const shouldHideNavbar = isImmersiveMode || page === 'intranet' || page === 'conocenos';

  return (
    <>
      <div className={`potion-global-overlay ${potionSplash}`}>
        <div className="splatter-drop drop-1"></div>
        <div className="splatter-drop drop-2"></div>
        <div className="splatter-drop drop-3"></div>
      </div>
      <div className={`app-container transition-${transitionStatus} dir-${transitionDirection} ${isImmersiveMode ? 'sotano-mode' : ''} ${page === 'login' ? 'full-width-page' : ''}`}>
        {!shouldHideNavbar && (
          <Navbar
            isWorker={isWorker}
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            user={user}
            onLoginToggle={() => {
              if (isLoggedIn) {
                setIsLoggedIn(false);
                setUser(null);
              } else {
                navigateTo('login');
              }
            }}
          />
        )}

        {(isImmersiveMode && page !== 'home') && (
          <button
            className="sotano-back-arrow"
            onClick={() => navigateTo('home')}
            aria-label="Back to the village"
          >
            <span className="arrow-icon">↑</span>
          </button>
        )}

        {(page !== 'home' && !isImmersiveMode && page !== 'intranet' && page !== 'conocenos') && (
          <button
            className="back-to-home-btn floating"
            onClick={() => navigateTo('home')}
            aria-label="Back to home"
          >
            <span className="back-text">Back</span>
          </button>
        )}

        <div className="main-content" style={{ paddingTop: shouldHideNavbar ? '0' : '70px' }}>
          {renderContent()}
        </div>

        <MagicalAlert
          isOpen={alertConfig.isOpen}
          message={alertConfig.message}
          type={alertConfig.type}
          onConfirm={alertConfig.onConfirm}
        />
      </div>
    </>
  );
}

export default App;