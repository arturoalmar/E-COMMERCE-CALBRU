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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      case 'cauldrons':
        return (
          <div className="sign-options">
            <button onClick={() => setPage('creator')}>NEW CAULDRON</button>
            <button onClick={() => setPage('my-cauldrons')}>MY CAULDRONS</button>
          </div>
        );
      case 'conocenos':
        return (
          <div className="sign-options">
            <button onClick={() => setPage('conocenos')}>Our Magic Story</button>
            <button onClick={() => setPage('conocenos')}>How We Forge</button>
          </div>
        );
      case 'intranet':
        return (
          <div className="sign-options">
            {isLoggedIn && isWorker ? (
              <button onClick={() => setPage('intranet')}>Guild Dashboard</button>
            ) : (
              <button onClick={() => setPage('login')}>Worker Portal</button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="landing-immersive">
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
