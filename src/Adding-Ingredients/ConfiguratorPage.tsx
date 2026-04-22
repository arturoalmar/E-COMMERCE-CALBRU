import React from 'react';
import { Genre, Particle, OptionsMap } from '../types';

interface ConfiguratorPageProps {
  newBgImg: string;
  selections: OptionsMap;
  particles: Particle[];
  selectedGenre: Genre | null;
  isFusionReady: boolean;
  toggleOption: (category: string, optionId: string) => void;
}

const ConfiguratorPage: React.FC<ConfiguratorPageProps> = ({
  newBgImg,
  selections,
  particles,
  selectedGenre,
  isFusionReady,
  toggleOption
}) => {
  /**
   * Genera una cuadrícula de opciones (estantería) para una categoría específica.
   */
  const generateOptionsGrid = (category: string, title: string, cornerClass: string) => {
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

  return (
    <>
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
        {generateOptionsGrid('diseno', 'Diseño Gráfico', 'corner-tl')}
        {generateOptionsGrid('tematica', 'Temática', 'corner-tr')}
        {generateOptionsGrid('mecanicas', 'Mecánicas Extra', 'corner-bl')}
        {generateOptionsGrid('plataforma', 'Banda Sonora', 'corner-br')}

        <div className="center-dashboard">
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
};

export default ConfiguratorPage;
