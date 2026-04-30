import React from 'react';
import proyectImg from '../assets/proyect.png';

interface LandingPageProps {
  setPage: (page: any) => void;
  isLoggedIn: boolean;
  isWorker?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage, isLoggedIn, isWorker }) => {
  return (
    <main className="homepage">
      {/* Navigation Buttons below Navbar */}
      <div className="landing-nav-container">
        <div className="landing-nav-buttons">
          <button className="nav-button-witch" onClick={() => setPage('creator')}>New Cauldron</button>
          <button className="nav-button-witch" onClick={() => setPage('my-cauldrons')}>My Cauldrons</button>
          <button className="nav-button-witch" onClick={() => setPage('conocenos')}>Conócenos</button>
          {isLoggedIn && isWorker && (
            <button className="nav-button-witch intranet" onClick={() => setPage('intranet')}>Intranet</button>
          )}
        </div>
      </div>


      {/* SECTION: HERO */}
      <section className="landing-hero-sketch">
        <div className="hero-sketch-content">
          <div className="hero-text-side">
            <h1>From your mind to the cauldron: create the game you want</h1>
            <p className="hero-subtitle">Let the magic flow... Get a demo in a few clicks.</p>
            <button className="btn-sketch-main" onClick={() => {
              setPage('creator');
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
    </main>
  );
};

export default LandingPage;
