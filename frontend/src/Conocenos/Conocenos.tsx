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
    role: 'Founder & Supreme Master of Back-end',
    description: 'Great genius of software engineering, Arturo is the architect behind the magic that makes The Hag\'s Cauldron work. His code is as clean as a well-cast spell.',
  },
  {
    name: 'Joel Sánchez',
    role: 'Founder & Great Front-end Sorcerer',
    description: 'Brilliant mind behind the enchanted interface. Joel transforms lines of code into visual experiences that make every user feel like a true wizard using our platform.',
  }
];

const REVIEWS = [
  { id: 1, user: 'Aragorn99', text: 'Incredible! I was able to prototype my card game in minutes. The aesthetics are brutal.' },
  { id: 2, user: 'Morgana_Magic', text: 'The cauldron is super intuitive. The particle effects make you feel like a true witch.' },
  { id: 3, user: 'PixelWizard', text: 'The Hag\'s Cauldron has changed the way I present ideas. Fast, stylish and functional.' },
  { id: 4, user: 'ShadowCaster', text: 'Finally a place where magic and technology meet. Addictive!' }
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
      <button className="btn-back" onClick={onBack} aria-label="Back to landing">
        ← Back
      </button>
      <div className="scroll-content">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">The Hag's Cauldron</h1>
            <p className="hero-tagline">Where Magic and Technology Forge Extraordinary Stories</p>
            <div className="decorative-line"></div>
          </div>
        </section>

        {/* HISTORIA */}
        <section className="story-section">
          <div className="section-content">
            <h2 className="section-title">Our Story</h2>
            <p className="story-text">
              In the heart of an enchanted forest, just three years ago, two visionary sorcerers decided that the magic
              of game design should not be exclusive to big studios. Thus was born <strong>The Hag's Cauldron</strong>,
              a small studio of creativity where every idea, no matter how small, can be transformed into a magical experience.
            </p>
            <p className="story-text">
              Our name evokes the ancient ritual of sorcerers: mixing precise ingredients to create powerful potions.
              In the same way, we believe that personalized video games are the perfect combination of passion,
              technology and unleashed creativity.
            </p>
          </div>
        </section>

        {/* MISIÓN Y VALORES */}
        <section className="mission-section">
          <div className="section-content">
            <h2 className="section-title">Our Mission and Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Unleashed Creativity</h3>
                <p>No limits, no standard prototypes. Your vision, our spell.</p>
              </div>
              <div className="value-card">
                <h3>Magical Speed</h3>
                <p>Ideas to cauldron, game at once. Prototypes in minutes, not months.</p>
              </div>
              <div className="value-card">
                <h3>Enchanted Community</h3>
                <p>Together we create a circle of passionate creators. Your success is our triumph.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="team-section">
          <div className="section-content">
            <h2 className="section-title">The Circle of Witches</h2>
            <p className="team-intro">Two sorcerers dedicate their days to making the impossible possible.</p>
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
            <h2 className="section-title">Magical Achievements</h2>
            <div className="achievements-grid">
              <div className="achievement-box">
                <div className="achievement-number">150+</div>
                <p className="achievement-text">Cauldrons Forged</p>
              </div>
              <div className="achievement-box">
                <div className="achievement-number">3</div>
                <p className="achievement-text">Years of Magic</p>
              </div>
              <div className="achievement-box">
                <div className="achievement-number">1,200+</div>
                <p className="achievement-text">Happy Alchemists</p>
              </div>
              <div className="achievement-box">
                <div className="achievement-number">∞</div>
                <p className="achievement-text">Dreams Realized</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews-section">
          <div className="section-content">
            <h2 className="section-title">What Our Alchemists Say</h2>
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
            <h2 className="cta-title">Ready to Forge Your Cauldron?</h2>
            <p className="cta-subtitle">Join our circle of magical creators</p>
            <button className="btn-primary-magic" onClick={onStartNow}>
              START NOW
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