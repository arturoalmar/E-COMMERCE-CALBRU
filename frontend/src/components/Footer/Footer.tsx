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
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cauldrons</a></li>
            <li><a href="#">Ingredients</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Hag's Cauldron - Forging Legends</p>
      </div>
    </footer>
  );
};

export default Footer;
