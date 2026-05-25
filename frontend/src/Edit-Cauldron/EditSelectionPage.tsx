/**
 * 📄 ARCHIVO: EditSelectionPage.tsx
 * 📝 DESCRIPCIÓN: Copia de SelectionPage adaptada para el flujo de edición.
 *   — Título distinto ("Edit Game Genre")
 *   — El género actual del caldero aparece pre-seleccionado (resaltado)
 */

import React, { useState } from 'react';
import { Genre } from '../types';
import '../Selection-Cauldron/SelectionCauldron.css';

import fondoElegir from '../assets/Fondo_elegir.png';
import libroImg    from '../assets/libro.png';
import Footer      from '../components/Footer/Footer';

interface EditSelectionPageProps {
  genres: Genre[];
  currentGenreName: string | null;   // nombre display del caldero ("Juego de Cartas", etc.)
  handleSelectGenre: (genre: Genre) => void;
  onBack: () => void;
}

const EditSelectionPage: React.FC<EditSelectionPageProps> = ({
  genres,
  currentGenreName,
  handleSelectGenre,
  onBack,
}) => {
  const [hoveredGenre,    setHoveredGenre]    = useState<Genre | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<string | number | null>(null);

  const onGenreClick = (genre: Genre) => {
    setSelectedGenreId(genre.id);
    handleSelectGenre(genre);
  };

  // Mapa inverso: nombre display → nombre interno del Genre
  const DISPLAY_TO_GENRE_NAME: Record<string, string> = {
    'Juego de Cartas':        'Cards',
    'Plataformas':            'Platformer',
    'Estilo Mario Party':     'Party',
    'Estilo Vampire Survivor':'Autoshooter',
  };

  const currentInternalName = currentGenreName
    ? (DISPLAY_TO_GENRE_NAME[currentGenreName] ?? currentGenreName)
    : null;

  const isCurrentGenre = (genre: Genre) =>
    genre.name === currentInternalName;

  return (
    <div className="selection-container">
      <button className="back-to-landing-btn" onClick={onBack} aria-label="Back">
        ← Back
      </button>
      <div
        className="selection-bg-layer"
        style={{ backgroundImage: `url(${fondoElegir})` }}
      />
      <div className="selection-content">
        <h1 className="selection-title">Edit Game Genre</h1>
        {currentGenreName && (
          <p className="selection-subtitle">
            Current genre: <strong>{currentGenreName}</strong> — select a new one or keep it.
          </p>
        )}
        <div className="cauldrons-grid">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`cauldron-button
                ${selectedGenreId === genre.id ? 'selected' : ''}
                ${isCurrentGenre(genre) && selectedGenreId === null ? 'current-genre' : ''}
              `}
              onClick={() => onGenreClick(genre)}
              onMouseEnter={() => setHoveredGenre(genre)}
              onMouseLeave={() => setHoveredGenre(null)}
            >
              <img src={genre.image} alt={genre.name} />
              {isCurrentGenre(genre) && (
                <span className="current-genre-badge">Current</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {hoveredGenre && (
        <div className="book-overlay">
          <div className="book-container">
            <img src={libroImg} alt="Book" className="book-image" />
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

export default EditSelectionPage;
