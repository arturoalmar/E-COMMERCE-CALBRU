import { useState } from 'react';
import './App.css';

// Componentes
import LandingPage from './Landing/LandingPage';
import SelectionPage from './Selection-Cauldron/SelectionPage';
import ConfiguratorPage from './Adding-Ingredients/ConfiguratorPage';

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

  /* ==========================================================================
     LÓGICA DE INTERACCIÓN
     ========================================================================== */

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
  
  const renderHomePage = () => (
    <LandingPage setPage={setPage} setCurrentStep={setCurrentStep} />
  );

  const renderSelectionStep = () => (
    <SelectionPage genres={GENRES} handleSelectGenre={handleSelectGenre} />
  );

  const renderConfiguratorStep = () => (
    <ConfiguratorPage 
      newBgImg={newBgImg}
      selections={selections}
      particles={particles}
      selectedGenre={selectedGenre}
      isFusionReady={isFusionReady}
      toggleOption={toggleOption}
    />
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
