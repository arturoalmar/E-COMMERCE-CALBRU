/**
 * 📄 ARCHIVO: LandingPage.tsx
 * 📝 DESCRIPCIÓN: Página de inicio temática con la poción mágica.
 */

import React, { useState } from 'react';
import forestBg from '../assets/forest_house_bg.png';
import './LandingPage.css';

import titleLabel from '../assets/Etiqueta-titulo.png';
import iconImg from '../assets/Icon.png';
// potionImg reserved for future use
import { Page } from '../types';

// LandingPage.tsx - Versión "Forest Cottage"
// Basada en el mockup de la cabaña en el bosque con estética de cuento ilustrado.

// SECCIÓN: Definición de datos/propiedades
interface LandingPageProps {
  setPage: (page: Page) => void;
  isLoggedIn: boolean;
  user?: { username: string; email?: string } | null;
  isWorker?: boolean;
  onLogout?: () => void;
}

// SECCIÓN: Componente o Función lógica
const LandingPage: React.FC<LandingPageProps> = ({ setPage, isLoggedIn, user, isWorker: _isWorker, onLogout }) => {
  const [isExploding, setIsExploding] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // SECCIÓN: Componente o Función lógica
  const handlePotionClick = () => {
    if (isExploding) return;
    setIsExploding(true);

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('potion-splash'));

      setTimeout(() => {
        setPage('creator');
      }, 500);
    }, 400);
  };

  // SECCIÓN: Renderizado visual
  return (
    <div className="landing-forest-container">
      {/* Background Illustration */}
      <div
        className="forest-bg-layer"
        style={{ backgroundImage: `url(${forestBg})` }}
      />

      {/* Header Navigation */}
      <header className="forest-header">
        <nav className="forest-nav">
          <div className="nav-left">
            <button className="nav-btn magical-btn" onClick={() => setPage('my-cauldrons')}>MY CAULDRONS</button>
            <button className="nav-btn magical-btn" onClick={() => setPage('conocenos')}>ABOUT US</button>
          </div>

          <div className="logo-center">
            <img src={iconImg} alt="Calbru Logo" className="nav-logo-img" />
          </div>

          <div className="nav-right" style={{ position: 'relative' }}>
            <button className="nav-btn magical-btn" onClick={() => setPage('intranet')}>INTRANET</button>
            {isLoggedIn && user ? (
              <>
                <div
                  className="user-profile-badge"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(121, 58, 119, 0.9)', padding: '0.4rem 1rem', borderRadius: '30px', border: '2px solid var(--gold)', cursor: 'pointer' }}
                >
                  <div className="user-icon" style={{ fontSize: '1.2rem' }}>🧙‍♂️</div>
                  <div className="user-info-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>{user.username}</span>
                    {user.email && <span style={{ fontSize: '0.7rem', color: '#ccc' }}>{user.email}</span>}
                  </div>
                </div>

                {isUserMenuOpen && (
                  <div className="user-dropdown-menu" style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: 'rgba(20, 15, 25, 0.95)',
                    border: '2px solid var(--gold)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    minWidth: '180px',
                    zIndex: 1000,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <div style={{ borderBottom: '1px solid #444', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Logged in as</p>
                      <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--gold)' }}>{user.username}</p>
                    </div>
                    <button
                      onClick={onLogout}
                      style={{
                        background: 'rgba(255, 50, 50, 0.1)',
                        border: '1px solid #ff4444',
                        color: '#ff4444',
                        padding: '0.6rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      LOGOUT
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                className="forest-sign-in-btn"
                onClick={() => setPage('login')}
              >
                SIGN IN
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Title Scroll Banner */}
      <div className="title-banner-wrapper">
        <img src={titleLabel} alt="The Hag's Cauldron" className="title-scroll-img" />
      </div>

      {/* High-Fidelity Potion Button (Moved for better positioning) */}
      <div className="forest-action-area" style={{ zIndex: 9999 }}>
        <button
          className={`forest-potion-new-btn ${isExploding ? 'exploding' : ''}`}
          onClick={handlePotionClick}
        >
          <div className="potion-container">
            <svg className="potion-svg-rebuilt" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="potion-body-mask">
                  <path d="M50,125 C75,125 92,105 92,75 C92,45 75,35 50,35 C25,35 8,45 8,75 C8,105 25,125 50,125 Z" fill="white" />
                </mask>
                <radialGradient id="glass-gradient" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="black" stopOpacity="0.1" />
                </radialGradient>
              </defs>

              <path className="bottle-glass-back" d="M50,125 C75,125 92,105 92,75 C92,45 75,35 50,35 C25,35 8,45 8,75 C8,105 25,125 50,125 Z" fill="rgba(255,255,255,0.1)" stroke="#3e2723" strokeWidth="2" />

              <g mask="url(#potion-body-mask)">
                <rect className="liquid-fill-rebuilt" x="0" y="35" width="100" height="100" />

                {/* Progressive Bubbles */}
                <circle className="internal-bubble b1" cx="30" cy="115" r="2" />
                <circle className="internal-bubble b2" cx="70" cy="110" r="3" />
                <circle className="internal-bubble b3" cx="50" cy="120" r="1.5" />
                <circle className="internal-bubble b4" cx="40" cy="105" r="2.5" />
                <circle className="internal-bubble b5" cx="60" cy="112" r="2" />
                <circle className="internal-bubble b6" cx="45" cy="118" r="3" />
              </g>

              <g className="bottle-neck-group">
                <path className="neck-glass" d="M40,15 L60,15 L62,38 L38,38 Z" fill="rgba(255,255,255,0.1)" stroke="#3e2723" strokeWidth="2" />
                <rect className="potion-cork-rebuilt" x="38" y="5" width="24" height="12" rx="2" fill="#6d4c41" />
              </g>

              <path className="bottle-shine" d="M25,55 C15,70 15,85 25,100" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <div className="potion-parchment-label">
              <span>New Cauldron</span>
            </div>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <main className="forest-main">
        {/* Main content area */}
      </main>

      {/* Footer Info */}
      <footer className="forest-footer">
        {/* Footer text removed as requested */}
      </footer>
    </div>
  );
};

export default LandingPage;
