/**
 * 📄 ARCHIVO: Navbar.tsx
 * 📝 DESCRIPCIÓN: Componente de la barra de navegación superior de la aplicación.
 */

import React, { useState } from 'react';
import './Navbar.css';
import { Page } from '../../types';

// Navbar.tsx
// Barra de navegación superior que permite cambiar de página,
// abrir el menú y gestionar el acceso al login/intranet.

// SECCIÓN: Definición de datos/propiedades
interface NavbarProps {
  isWorker: boolean;
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  hideMenuToggle?: boolean;
}

// SECCIÓN: Componente o Función lógica
const Navbar: React.FC<NavbarProps> = ({ isWorker, onNavigate, isLoggedIn, onLoginToggle, hideMenuToggle }) => {
  // Estado local para controlar si el menú desplegable está abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

// SECCIÓN: Componente o Función lógica
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

// SECCIÓN: Componente o Función lógica
  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

// SECCIÓN: Renderizado visual
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {!hideMenuToggle && (
          <>
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
            
            {isMenuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleNavigate('home')}>Home</button>
                <button onClick={() => handleNavigate('conocenos')}>Conócenos</button>
                <button onClick={() => handleNavigate('creator')}>New Cauldron</button>
                <button onClick={() => handleNavigate('my-cauldrons')}>My Cauldrons</button>
                {isLoggedIn && isWorker && (
                  <button onClick={() => handleNavigate('intranet')} className="intranet-link">
                    Intranet
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="navbar-center" onClick={() => handleNavigate('home')}>
        <span className="logo-text">The Hag's Cauldron</span>
      </div>

      <div className="navbar-right">
        <button className="user-profile" onClick={onLoginToggle}>
          <span className="user-name">{isLoggedIn ? 'User' : 'Sign In'}</span>
          <div className="user-icon">
            {isLoggedIn ? (
              <img 
                src="https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_120dp.png" 
                alt="User" 
              />
            ) : (
              <div className="login-placeholder">?</div>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
