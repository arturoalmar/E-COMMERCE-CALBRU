/**
 * 📄 ARCHIVO: Conocenos.tsx
 * 📝 DESCRIPCIÓN: Página "Sobre Nosotros" — pergamino completo en pantalla, scroll interior
 */

import React, { useState, useEffect } from 'react';
import './Conocenos.css';
import Footer from '../components/Footer/Footer';
import libroAbout from '../assets/libro.png';

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Arturo Almudi',
    role: 'Fundador & Maestro Supremo del Back-end',
    description: 'Gran genio de la ingeniería de software, Arturo es el arquitecto detrás de la magia que hace funcionar The Hag\'s Cauldron. Su código es tan limpio como un hechizo bien lanzado.',
  },
  {
    name: 'Joel Sánchez',
    role: 'Fundador & Gran Hechicero del Front-end',
    description: 'Mente pensante detras de la interfaz encantada. Joel transforma líneas de código en experiencias visuales que hacen que cada usuario se sienta como un verdadero brujo al usar nuestra plataforma.',
  }
];

const REVIEWS = [
  { id: 1, user: 'Aragorn99', text: '¡Increíble! Pude prototipar mi juego de cartas en minutos. La estética es brutal.' },
  { id: 2, user: 'Morgana_Magic', text: 'El caldero es súper intuitivo. Los efectos de partículas te hacen sentir como una verdadera bruja.' },
  { id: 3, user: 'PixelWizard', text: 'The Hag\'s Cauldron ha cambiado mi forma de presentar ideas. Rápido, estiloso y funcional.' },
  { id: 4, user: 'ShadowCaster', text: 'Finalmente un lugar donde la magia y la tecnología se encuentran. ¡Adictivo!' }
];

interface ConocenosProps {
  onStartNow: () => void;
  onBack: () => void;
}

const Conocenos: React.FC<ConocenosProps> = ({ onStartNow, onBack }) => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="conocenos-wrapper">
    <div className="conocenos-page" style={{ backgroundImage: `url(${libroAbout})` }}>
      <button className="btn-back" onClick={onBack} aria-label="Volver a la landing">
        ← Volver
      </button>
      <div className="scroll-content">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">The Hag's Cauldron</h1>
            <p className="hero-tagline">Donde la Magia y la Tecnología Forjan Historias Extraordinarias</p>
            <div className="decorative-line"></div>
          </div>
        </section>

        {/* HISTORIA */}
        <section className="story-section">
          <div className="section-content">
            <h2 className="section-title">Nuestra Historia</h2>
            <p className="story-text">
              En el corazón de un bosque encantado, hace apenas tres años, dos brujos visionarios decidieron que la magia
              del diseño de juegos no debería ser exclusiva de los grandes estudios. Así nació <strong>The Hag's Cauldron</strong>,
              un pequeño estudio de creatividad donde cada idea, por pequeña que sea, puede transformarse en una experiencia mágica.
            </p>
            <p className="story-text">
              Nuestro nombre evoca el ritual antiguo de los brujos: mezclar ingredientes precisos para crear pociones poderosas.
              Del mismo modo, nosotros creemos que los videojuegos personalizados son la combinación perfecta de pasión,
              tecnología y creatividad desenfrenada.
            </p>
          </div>
        </section>

        {/* MISIÓN Y VALORES */}
        <section className="mission-section">
          <div className="section-content">
            <h2 className="section-title">Nuestra Misión y Valores</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Creatividad Desenfrenada</h3>
                <p>Sin límites, sin prototipos estándar. Tu visión, nuestro hechizo.</p>
              </div>
              <div className="value-card">
                <h3>Rapidez Mágica</h3>
                <p>Ideas al caldero, juego al momento. Prototipos en minutos, no en meses.</p>
              </div>
              <div className="value-card">
                <h3>Comunidad Hechizada</h3>
                <p>Juntos creamos un círculo de creadores apasionados. Tu éxito es nuestro triunfo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="team-section">
          <div className="section-content">
            <h2 className="section-title">El Círculo de Brujas</h2>
            <p className="team-intro">Dos hechiceros dedican sus días a hacer posible lo imposible.</p>
            <div className="team-grid">
              {TEAM.map((member) => (
                <div key={member.name} className="team-card">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOGROS */}
        <section className="achievements-section">
          <div className="section-content">
            <h2 className="section-title">Logros Mágicos</h2>
            <div className="achievements-grid">
              <div className="achievement-box">
                <div className="achievement-number">150+</div>
                <p className="achievement-text">Calderos Forjados</p>
              </div>
              <div className="achievement-box">
                <div className="achievement-number">3</div>
                <p className="achievement-text">Años de Magia</p>
              </div>
              <div className="achievement-box">
                <div className="achievement-number">1,200+</div>
                <p className="achievement-text">Alquimistas Felices</p>
              </div>
              <div className="achievement-box">
                <div className="achievement-number">∞</div>
                <p className="achievement-text">Sueños Realizados</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews-section">
          <div className="section-content">
            <h2 className="section-title">Lo Que Dicen Nuestros Alquimistas</h2>
            <div className="reviews-container">
              <div className="review-card-active">
                <div className="review-text">"{REVIEWS[currentReview].text}"</div>
                <div className="review-author">— {REVIEWS[currentReview].user}</div>
              </div>
              <div className="carousel-dots">
                {REVIEWS.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentReview ? 'active' : ''}`}
                    onClick={() => setCurrentReview(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Review ${i + 1}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="section-content">
            <h2 className="cta-title">¿Listo para Forjar tu Caldero?</h2>
            <p className="cta-subtitle">Únete a nuestro círculo de creadores mágicos</p>
            <button className="btn-primary-magic" onClick={onStartNow}>
              COMIENZA AHORA
            </button>
          </div>
        </section>

      </div>
    </div>

    {/* FOOTER — fuera del libro, debajo. Visible al hacer scroll del body */}
    <div className="footer-wrapper">
      <Footer />
    </div>

    </div>
  );
};

export default Conocenos;