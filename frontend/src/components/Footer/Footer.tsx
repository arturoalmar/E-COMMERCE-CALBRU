import React from 'react';
import './Footer.css';
import cauldronIcon from '../../assets/Icon.png';

const Footer: React.FC = () => {
  return (
    <footer className="selection-footer">
      <div className="footer-content">
        <div className="footer-section footer-logo-social">
          <img src={cauldronIcon} alt="Logo" className="footer-logo" />
          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="Instagram">i</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Navegación</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Calderos</a></li>
            <li><a href="#">Ingredientes</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Términos</a></li>
            <li><a href="#">Privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Hag's Cauldron - Forjando Leyendas</p>
      </div>
    </footer>
  );
};

export default Footer;
