import React, { useState, useRef } from 'react';
import villageBg from '../assets/hags_village_bg.png';
import woodenSign from '../assets/wooden_sign.png';
import iconImg from '../assets/icon.png';
import titleLabel from '../assets/Etiqueta-titulo.png';
import { Page } from '../types';

// LandingPage.tsx
// Página de inicio inmersiva. Muestra la aldea, el logo central y los carteles de madera interactivos.
// El usuario puede elegir entrar al creador de calderos, ver la intranet o conocer más sobre el proyecto.

interface LandingPageProps {
  setPage: (page: Page) => void;
  isLoggedIn: boolean;
  isWorker?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage, isLoggedIn, isWorker }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const switchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePotionClick = () => {
    if (isExploding) return;
    setIsExploding(true);
    
    // Trigger the global splash immediately after explosion starts
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('potion-splash'));
      
      // Navigate to creator while the screen is covered
      setTimeout(() => {
        setPage('creator');
      }, 500); 
    }, 400); // the potion shakes then explodes after 400ms
  };

  // Cuando el ratón entra en un cartel, se prepara un cambio de sección.
  // Si el usuario mueve el ratón rápidamente entre carteles, se añade un pequeño retardo
  // para evitar cambios demasiado bruscos y permitir una animación de transición más suave.
  const handleMouseEnter = (section: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (hoveredSection && hoveredSection !== section) {
      setHoveredSection(null);
      if (switchTimeoutRef.current) clearTimeout(switchTimeoutRef.current);
      
      switchTimeoutRef.current = setTimeout(() => {
        setHoveredSection(section);
      }, 650);
    } else {
      setHoveredSection(section);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredSection(null);
    }, 750); 
  };

  type LandingSignKey = 'cauldrons' | 'conocenos' | 'intranet';
  const signItems: { key: LandingSignKey; buttons: { label: string; page: Page }[] }[] = [
    {
      key: 'cauldrons',
      buttons: [
        { label: 'NEW CAULDRON', page: 'creator' },
        { label: 'MY CAULDRONS', page: 'my-cauldrons' },
      ],
    },
    {
      key: 'conocenos',
      buttons: [
        { label: 'Our Magic Story', page: 'conocenos' },
        { label: 'How We Forge', page: 'conocenos' },
      ],
    },
    {
      key: 'intranet',
      buttons: [
        {
          label: isLoggedIn && isWorker ? 'Guild Dashboard' : 'Worker Portal',
          page: isLoggedIn && isWorker ? 'intranet' : 'login',
        },
      ],
    },
  ];

  const renderSignContent = (section: string) => {
    const sign = signItems.find((item) => item.key === section);
    if (!sign) return null;

    return (
      <div className="sign-options">
        {sign.buttons.map((button) => (
          <button key={button.label} onClick={() => setPage(button.page)}>
            {button.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="landing-immersive">
      {/* Background */}
      <div 
        className="village-bg-immersive" 
        style={{ backgroundImage: `url(${villageBg})` }}
      />

      <div className="landing-interactive-wrapper">
        <button 
          className="landing-login-btn-top-right" 
          onClick={() => setPage('login')}
        >
          Sign In
        </button>
        <nav 
          className="landing-top-nav"
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-group-left">
            <a 
              className="landing-nav-link" 
              onMouseEnter={() => handleMouseEnter('cauldrons')}
              onClick={() => handleMouseEnter('cauldrons')}
            >
              CAULDRONS
            </a>
          </div>
          
          <div className="logo-container">
            <img src={iconImg} alt="Icon" className="landing-logo-center" />
          </div>

          <div className="nav-group-right">
            <a 
              className="landing-nav-link" 
              onMouseEnter={() => handleMouseEnter('conocenos')}
              onClick={() => setPage('conocenos')}
            >
              ABOUT US
            </a>
            <a 
              className="landing-nav-link" 
              onMouseEnter={() => handleMouseEnter('intranet')}
              onClick={() => setPage('intranet')}
            >
              INTRANET
            </a>
          </div>
        </nav>

        {/* Dropping Wooden Signs */}
        {signItems.map((sign) => (
          <div
            key={sign.key}
            className={`wooden-sign-container wooden-sign-${sign.key} ${hoveredSection === sign.key ? 'dropped active' : ''}`}
            onMouseEnter={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="sign-wrapper">
              <img
                src={woodenSign}
                alt={`Cartel de madera ${sign.key}`}
                className="wooden-sign-img"
              />
              <div className="sign-content-overlay">
                {renderSignContent(sign.key)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Sign */}
      <div className="welcome-gate-sign">
        <img src={titleLabel} alt="The Hag's Cauldron" className="welcome-sign-img" />
      </div>

      {/* Quick Action Bottom Button */}
      <div className="landing-bottom-action">
        <button className={`potion-btn ${isExploding ? 'exploding' : ''}`} onClick={handlePotionClick}>
          <div className="potion-cork"></div>
          <div className="potion-neck">
            <div className="potion-tie potion-tie-1"></div>
            <div className="potion-tie potion-tie-2"></div>
            <div className="potion-tie potion-tie-3"></div>
            <div className="potion-charm">
              <span className="charm-moon">🌙</span>
              <span className="charm-star">⭐</span>
            </div>
          </div>
          <div className="potion-body">
            <div className="potion-liquid">
              <div className="bubble bubble-1"></div>
              <div className="bubble bubble-2"></div>
              <div className="bubble bubble-3"></div>
              <div className="bubble bubble-4"></div>
              <div className="bubble bubble-5"></div>
              <div className="bubble bubble-6"></div>
              <div className="bubble bubble-7"></div>
              <div className="potion-swirl"></div>
            </div>
            <div className="potion-label-wrapper">
              <div className="potion-label-bg"></div>
              <span className="potion-label-text">Start creating</span>
            </div>
            <div className="potion-glare"></div>
            <div className="potion-glare-small"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
