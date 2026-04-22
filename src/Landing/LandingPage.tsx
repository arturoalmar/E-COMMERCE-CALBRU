import React, { useState, useEffect } from 'react';
import backgroundImg from '../assets/background.png';
import proyectImg from '../assets/proyect.png';
import spritesImg from '../assets/Sprittes.png';

interface LandingPageProps {
  setPage: (page: 'home' | 'creator' | 'login') => void;
  setCurrentStep: (step: 'select-pot' | 'configurator') => void;
  isLoggedIn: boolean;
}

const REVIEWS = [
  { id: 1, user: 'Aragorn99', text: '¡Increíble! Pude prototipar mi juego de cartas en minutos. La estética es brutal.' },
  { id: 2, user: 'Morgana_Magic', text: 'El caldero es súper intuitivo. Los efectos de partículas te hacen sentir como una verdadera bruja.' },
  { id: 3, user: 'PixelWizard', text: 'Calbru Games ha cambiado mi forma de presentar ideas. Rápido, estiloso y funcional.' }
];

const LandingPage: React.FC<LandingPageProps> = ({ setPage, setCurrentStep, isLoggedIn }) => {
  const [currentReview, setCurrentReview] = useState(0);

  // Efecto para cambiar las reseñas automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="homepage">
      {isLoggedIn && (
        <div className="welcome-banner" style={{ padding: '1rem', background: 'rgba(140, 92, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(140, 92, 255, 0.2)', textAlign: 'center', marginBottom: '-1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#bf88ff' }}>¡Bienvenido de nuevo, Alquimista!</h2>
        </div>
      )}

      {/* SECTION: HERO */}
      <section className="landing-hero-sketch">
        <div className="hero-sketch-content">
          <div className="hero-text-side">
            <h1>From your mind to the cauldron: create the game you want</h1>
            <p className="hero-subtitle">Let the magic flow... Get a demo in a few clicks.</p>
            <button className="btn-sketch-main" onClick={() => {
              setPage('creator');
              setCurrentStep('select-pot');
            }}>
              START NOW
            </button>
          </div>
          <div className="hero-visual-side">
            <div className="sketch-placeholder-box">
              <img src={proyectImg} alt="Game Preview" />
            </div>
          </div>
        </div>
      </section>

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

      {/* SECTION: HOW YOU DO IT? (Updated layout) */}
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
            <button className="btn-sketch-secondary" onClick={() => setPage('creator')}>
              BEGIN YOUR CREATION
            </button>
          </div>
          <div className="how-to-image-block">
            <img src={spritesImg} alt="Sprites and items" />
          </div>
        </div>
      </section>

      {/* SECTION: REVIEWS (Carousel) */}
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
    </main>
  );
};

export default LandingPage;
