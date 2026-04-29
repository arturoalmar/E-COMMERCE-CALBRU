import React from 'react';
import { Genre } from '../types';

interface SelectionPageProps {
  genres: Genre[];
  handleSelectGenre: (genre: Genre) => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({ genres, handleSelectGenre }) => {
  return (
    <>
      <header style={{ paddingTop: '80px', textAlign: 'center', paddingBottom: '12px' }}>
        <h1 style={{ marginBottom: '0.5rem', color: 'var(--primary-light)', fontSize: '3rem', textShadow: '0 0 10px rgba(124,179,66,0.6)' }}>La Choza de la Bruja</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontStyle: 'italic' }}>Acércate al caldero... Selecciona la poción base de tu videojuego.</p>
      </header>
      <div className="genre-grid">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-card">
            <img
              src={genre.image}
              alt={`${genre.name} caldero`}
              className="genre-image"
              style={{ filter: `hue-rotate(${genre.hue}deg) saturate(1.5)`, marginTop: 0, marginBottom: '1.2rem' }}
            />
            <h2>{genre.name}</h2>
            <p style={{ flexGrow: 1 }}>{genre.description}</p>
            <button
              className="btn-select"
              onClick={() => handleSelectGenre(genre)}
              style={{ marginTop: '1.5rem', width: '100%' }}
            >
              Echar al Caldero
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectionPage;
