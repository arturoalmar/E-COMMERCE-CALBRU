/**
 * 📄 ARCHIVO: Conocenos.tsx
 * 📝 DESCRIPCIÓN: Página informativa que presenta el proyecto y reseñas de usuarios.
 */

// Conocenos.tsx
// Página de información "Conócenos" que describe el proyecto, cómo funciona y muestra reseñas rotativas.

import React, { useState, useEffect } from 'react';
import './Conocenos.css';

import backgroundImg from '../assets/forest_house_bg.png';
import spritesImg from '../assets/Sprittes.png';

const REVIEWS = [
  { id: 1, user: 'Aragorn99', text: '¡Increíble! Pude prototipar mi juego de cartas en minutos. La estética es brutal.' },
  { id: 2, user: 'Morgana_Magic', text: 'El caldero es súper intuitivo. Los efectos de partículas te hacen sentir como una verdadera bruja.' },
  { id: 3, user: 'PixelWizard', text: 'Calbru Games ha cambiado mi forma de presentar ideas. Rápido, estiloso y funcional.' }
];

// SECCIÓN: Definición de datos/propiedades
interface ConocenosProps {
  onStartNow: () => void;
}

// SECCIÓN: Componente o Función lógica
const Conocenos: React.FC<ConocenosProps> = ({ onStartNow }) => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
// SECCIÓN: Componente o Función lógica
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
// SECCIÓN: Renderizado visual
    return () => clearInterval(interval);
  }, []);

// SECCIÓN: Renderizado visual
  return (
    <div className="conocenos-page">
      {/* SECTION: WHAT DO WE DO? & MAGIC */}
      <section className="sketch-info-grid">
        <div className="info-box">
          <div className="sketch-visual-small">
            <img src={backgroundImg} alt="Magic Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="info-text">
            <h2>What do we do?</h2>
            <ul>
              <li>- Personalized games</li>
              <li>- Demo of your idea</li>
            </ul>
            <h2 style={{ marginTop: '2rem' }}>Magic</h2>
            <ul>
              <li>- No waiting for studios</li>
              <li>- No need to learn</li>
              <li>- Your idea → your game</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION: HOW YOU DO IT? */}
      <section className="how-to-section-sketch">
        <div className="how-to-flex-container">
          <div className="how-to-text-block">
            <h2>How you do it?</h2>
            <ol>
              <li>1. Choose a cauldron</li>
              <li>2. Add what you want</li>
              <li>3. Try your demo</li>
              <li>4. Contact us</li>
            </ol>
            <button className="btn-sketch-secondary" onClick={onStartNow}>
              BEGIN YOUR CREATION
            </button>
          </div>
          <div className="how-to-image-block">
            <img src={spritesImg} alt="Sprites and items" />
          </div>
        </div>
      </section>

      {/* SECTION: REVIEWS */}
      <section className="reviews-carousel-section">
        <h2>Lo que dicen nuestros Alquimistas</h2>
        <div className="carousel-container">
          <div className="review-card-active">
            <div className="user-info">
              <div className="user-avatar-placeholder"></div>
              <strong>{REVIEWS[currentReview].user}</strong>
            </div>
            <p className="review-text">"{REVIEWS[currentReview].text}"</p>
          </div>
          <div className="carousel-dots">
            {REVIEWS.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentReview ? 'active' : ''}`}
                onClick={() => setCurrentReview(i)}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conocenos;
