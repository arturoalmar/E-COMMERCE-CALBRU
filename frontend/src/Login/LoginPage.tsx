// LoginPage.tsx
// Componente de formulario de acceso. Simula el ingreso de usuario y dispara el callback de login.

import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSealing, setIsSealing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSealing) return;
    setIsSealing(true);
    
    // Simular el tiempo de "estampado" antes de entrar
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="login-page-sketch">
      <div className="login-card-sketch">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="username..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="password..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-actions">
            <button type="submit" className={`btn-enter ${isSealing ? 'sealing' : ''}`}>
              {!isSealing ? 'Enter' : <div className="wax-seal"></div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
