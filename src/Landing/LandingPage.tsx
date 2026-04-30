import React, { useState, useRef } from 'react';
import villageBg from '../assets/hags_village_bg.png';
import woodenSign from '../assets/wooden_sign.png';
import iconImg from '../assets/icon.png';

interface LandingPageProps {
  setPage: (page: any) => void;
  isLoggedIn: boolean;
  isWorker?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage, isLoggedIn, isWorker }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (page: string) => {
    setIsExiting(true);
    setTimeout(() => {
      setPage(page);
    }, 800); // Duración de la animación de salida
  };

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

  const renderSignContent = () => {
    switch (hoveredSection) {
      case 'creator':
        return (
          <div className="sign-options">
            <button onClick={() => handleNavigate('creator')}>Start Creation</button>
          </div>
        );
      case 'my-cauldrons':
        return (
          <div className="sign-options">
            <button onClick={() => handleNavigate('my-cauldrons')}>Open My Collection</button>
          </div>
        );
      case 'conocenos':
        return (
          <div className="sign-options">
            <button onClick={() => handleNavigate('conocenos')}>Our Magic Story</button>
            <button onClick={() => handleNavigate('conocenos')}>How We Forge</button>
          </div>
        );
      case 'intranet':
        return (
          <div className="sign-options">
            {isLoggedIn && isWorker ? (
              <button onClick={() => handleNavigate('intranet')}>Guild Dashboard</button>
            ) : (
              <button onClick={() => handleNavigate('login')}>Worker Portal</button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`landing-immersive ${isExiting ? 'exiting' : ''}`}>
      {/* Background */}
      <div
        className="village-bg-immersive"
        style={{ backgroundImage: `url(${villageBg})` }}
      />

      <div className="landing-interactive-wrapper">
        {/* Top Nav */}
        <nav
          className="landing-top-nav"
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-group-left">
            <a
              className="landing-nav-link"
              onMouseEnter={() => handleMouseEnter('creator')}
              onClick={() => handleNavigate('creator')}
            >
              NEW CAULDRON
            </a>
            <a
              className="landing-nav-link"
              onMouseEnter={() => handleMouseEnter('my-cauldrons')}
              onClick={() => handleNavigate('my-cauldrons')}
            >
              MY CAULDRONS
            </a>
          </div>

          <div className="logo-container">
            <img src={iconImg} alt="Icon" className="landing-logo-center" />
          </div>

          <div className="nav-group-right">
            <a
              className="landing-nav-link"
              onMouseEnter={() => handleMouseEnter('conocenos')}
              onClick={() => handleNavigate('conocenos')}
            >
              ABOUT US
            </a>
            <a
              className="landing-nav-link"
              onMouseEnter={() => handleMouseEnter('intranet')}
              onClick={() => handleNavigate('intranet')}
            >
              INTRANET
            </a>
          </div>
        </nav>

        {/* Dropping Wooden Sign */}
        <div
          className={`wooden-sign-container ${hoveredSection ? 'dropped' : ''}`}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="sign-wrapper">
            <img src={woodenSign} alt="Cartel de madera" className="wooden-sign-img" />
            <div className="sign-content-overlay">
              {renderSignContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Sign */}
      <div className="welcome-gate-sign">
        <div className="welcome-sign-bg">
          <span className="welcome-prefix">Welcome to</span>
          <h1 className="welcome-title">The Hag's Cauldron</h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
