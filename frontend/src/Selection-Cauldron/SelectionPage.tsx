import React, { useState } from 'react';
import { Genre } from '../types';
import './SelectionCauldron.css';

import fondoElegir from '../assets/Fondo_elegir.png';
import libroImg from '../assets/libro.png';
import Footer from '../components/Footer/Footer';

interface SelectionPageProps {
  genres: Genre[];
  handleSelectGenre: (genre: Genre) => void;
  onBack: () => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({ genres, handleSelectGenre, onBack }) => {
  const [hoveredGenre, setHoveredGenre] = useState<Genre | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<string | number | null>(null);

  const onGenreClick = (genre: Genre) => {
    setSelectedGenreId(genre.id);
    handleSelectGenre(genre);
  };

  return (
    <div className="selection-container">
      <button className="back-to-landing-btn" onClick={onBack} aria-label="Volver al inicio">
        ← Volver
      </button>
      <div
        className="selection-bg-layer"
        style={{ backgroundImage: `url(${fondoElegir})` }}
      />
      <div className="selection-content">
        <h1 className="selection-title">Selecciona un Género de Juego</h1>
        <div className="cauldrons-grid">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`cauldron-button ${selectedGenreId === genre.id ? 'selected' : ''}`}
              onClick={() => onGenreClick(genre)}
              onMouseEnter={() => setHoveredGenre(genre)}
              onMouseLeave={() => setHoveredGenre(null)}
            >
              <img src={genre.image} alt={genre.name} />
            </div>
          ))}
        </div>
      </div>
      {hoveredGenre && (
        <div className="book-overlay">
          <div className="book-container">
            <img src={libroImg} alt="Libro" className="book-image" />
            <div className="book-text-overlay">
              <h2>{hoveredGenre.name}</h2>
              <p>{hoveredGenre.description}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SelectionPage;