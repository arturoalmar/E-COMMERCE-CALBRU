import React from 'react';
import { Genre } from '../types';

interface CauldronProps {
  selectedGenre: Genre | null;
  isFusionReady: boolean;
}

const Cauldron: React.FC<CauldronProps> = ({ selectedGenre, isFusionReady }) => {
  return (
    <div className="center-dashboard-content">
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
    </div>
  );
};

export default Cauldron;
