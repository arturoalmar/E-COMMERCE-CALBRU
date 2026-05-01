// SelectionPage.tsx
// Página donde el usuario elige la base de juego (género) que será usada para configurar el caldero.
// Muestra los calderos en el sótano y permite previsualizar la descripción de cada género.

import React, { useState } from 'react';
import { Genre } from '../types';
import sotanoBg from '../assets/Sotano.png';
import libroImg from '../assets/Libro.png';

interface SelectionPageProps {
  genres: Genre[];
  handleSelectGenre: (genre: Genre) => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({ genres, handleSelectGenre }) => {
  // Género actualmente bajo el cursor para mostrar datos en el libro central.
  const [hoveredGenre, setHoveredGenre] = useState<Genre | null>(null);

  return (
    <div className="sotano-selection-container">
      {/* Fondo Sotano */}
      <div 
        className="sotano-bg" 
        style={{ backgroundImage: `url(${sotanoBg})` }}
      />

      {/* Título superior */}
      <div className="sotano-header">
        <h1>Selecciona tu Pócima Base</h1>
        <p>Elige el caldero que forjará tu destino...</p>
      </div>

      {/* Área del Libro (Centro) - Ahora puramente informativa y sin eventos de ratón */}
      <div className={`selection-book-overlay ${hoveredGenre ? 'visible' : ''}`} style={{ pointerEvents: 'none' }}>
        <img src={libroImg} alt="Libro Abierto" className="selection-book-img" />
        {hoveredGenre && (
          <div className="book-content">
            <h2 className="book-title">{hoveredGenre.name}</h2>
            <p className="book-description">{hoveredGenre.description}</p>
            {/* El botón se ha movido al caldero o se ha eliminado para seguir la instrucción estrictamente */}
            <p className="book-hint">(Haz clic en el caldero para seleccionar)</p>
          </div>
        )}
      </div>

      {/* Calderos en el suelo */}
      <div className="cauldrons-floor">
        {genres.map((genre) => (
          <div 
            key={genre.id} 
            className="floor-cauldron-wrapper"
            onMouseEnter={() => setHoveredGenre(genre)}
            onMouseLeave={() => setHoveredGenre(null)}
            onClick={() => handleSelectGenre(genre)}
          >
            <img
              src={genre.image}
              alt={genre.name}
              className={`floor-cauldron-img ${hoveredGenre?.id === genre.id ? 'active' : ''}`}
              style={{
                filter: genre.id === 'platformer' ? 'none' : `hue-rotate(${genre.hue}deg) saturate(1.5)`
              }}
            />
            <div className="cauldron-glow" style={{ backgroundColor: `hsla(${genre.hue}, 70%, 50%, 0.3)` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionPage;
