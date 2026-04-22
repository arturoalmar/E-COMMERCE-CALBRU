import React from 'react';
import { Genre } from '../types';

interface SelectionPageProps {
  genres: Genre[];
  handleSelectGenre: (genre: Genre) => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({ genres, handleSelectGenre }) => {
  return (
    <>
      <header>
        <h1>La Choza de la Bruja</h1>
        <p>Acércate al caldero... Selecciona la poción base de tu videojuego.</p>
      </header>
      <div className="genre-grid">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-card">
            <h2>{genre.name}</h2>
            <button
              className="btn-select"
              onClick={() => handleSelectGenre(genre)}
            >
              Echar al Caldero
            </button>
            <img
              src={genre.image}
              alt={`${genre.name} caldero`}
              className="genre-image"
              style={{ filter: `hue-rotate(${genre.hue}deg) saturate(1.5)` }}
            />
            <p>{genre.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectionPage;
