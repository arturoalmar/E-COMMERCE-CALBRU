import React, { useState } from 'react';
import { Genre } from '../types';
import './SelectionCauldron.css';

import fondoElegir from '../assets/Fondo_elegir.png';
import libroImg from '../assets/libro.png';
import iconImg from '../assets/Icon.png';

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
      <footer className="selection-footer">
        <div className="footer-content">
          {/* Logo y Redes Sociales */}
          <div className="footer-section footer-logo-social">
            <img src={iconImg} alt="Hag's Cauldron Logo" className="footer-logo" />
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span className="social-icon">𝕏</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <span className="social-icon">💜</span>
              </a>
            </div>
          </div>

          {/* Links de Navegación */}
          <div className="footer-section footer-links">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#creator">Crear Caldero</a></li>
              <li><a href="#about">Acerca de</a></li>
              <li><a href="#my-cauldrons">Mis Calderos</a></li>
            </ul>
          </div>

          {/* Información Legal */}
          <div className="footer-section footer-legal">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Política de Privacidad</a></li>
              <li><a href="#terms">Términos y Condiciones</a></li>
              <li><a href="#cookies">Política de Cookies</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
        </div>

        {/* Línea de Copyright */}
        <div className="footer-bottom">
          <p>© 2024 Hag's Cauldron - Forjando Leyendas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SelectionPage;