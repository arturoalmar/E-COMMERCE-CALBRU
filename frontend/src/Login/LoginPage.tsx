/**
 * 📄 ARCHIVO: LoginPage.tsx
 * 📝 DESCRIPCIÓN: Página de login y registro con integración de backend.
 */

// LoginPage.tsx
// Componente de formulario de acceso y registro conectado al backend con AWS RDS.

import React, { useState } from 'react';
import './LoginPage.css';

// SECCIÓN: Definición de datos/propiedades
interface LoginPageProps {
  onLogin: (userData: { id: number, username: string, email?: string }) => void;
  onBack: () => void;
}

// SECCIÓN: Componente o Función lógica
const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSealing, setIsSealing] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // SECCIÓN: Componente o Función lógica
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSealing) return;
    setIsSealing(true);
    setError('');
    setMessage('');

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const baseUrl = 'http://localhost:5000';

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          ...(isRegistering && { email })
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      if (isRegistering) {
        setMessage('¡Mago registrado con éxito! Ya puedes entrar.');
        setIsRegistering(false);
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        localStorage.setItem('token', data.token);
        // Efecto de sello de cera
        setTimeout(() => {
          onLogin(data.user);
        }, 800);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      if (isRegistering || error) {
        setIsSealing(false);
      }
    }
  };

  // SECCIÓN: Renderizado visual
  return (
    <div className="login-page-sketch">
      {/* Botón Volver en la esquina superior izquierda */}
      <button 
        type="button" 
        className="login-back-btn-top"
        onClick={onBack}
        title="Return to the village"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: '1px solid var(--gold, #f0c86e)',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}
      >
        ← THE VILLAGE
      </button>

      <div className="login-card-sketch" style={{ position: 'relative', overflow: 'hidden' }}>
        <h1 style={{ marginBottom: '0.5rem', color: 'var(--gold, #f0c86e)' }}>
          {isRegistering ? 'New Apprentice' : 'Log In'}
        </h1>
        <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {isRegistering ? 'Join the academy of cauldrons' : 'Enter the hag\'s house'}
        </p>

        {error && <div className="error-box" style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#ff6b6b', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #ff6b6b' }}>{error}</div>}
        {message && <div className="success-box" style={{ background: 'rgba(81, 207, 106, 0.2)', color: '#51cf66', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #51cf66' }}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label style={{ display: 'block', textAlign: 'left', color: 'white', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Apprentice Name</label>
            <input
              type="text"
              name="username"
              autocomplete="username"
              placeholder="Enter your wizard name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {isRegistering && (
            <div className="input-group">
              <label style={{ display: 'block', textAlign: 'left', color: 'white', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Magic Scroll (Email)</label>
              <input
                type="email"
                name="email"
                autocomplete="email"
                placeholder="Where should we send the owls? (Email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label style={{ display: 'block', textAlign: 'left', color: 'white', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Secret Word (Password)</label>
            <input
              type="password"
              name="password"
              autocomplete={isRegistering ? "new-password" : "current-password"}
              placeholder="Keep it secret, keep it safe..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button type="submit" className={`btn-enter ${isSealing ? 'sealing' : ''}`} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>
              {!isSealing ? (isRegistering ? 'REGISTER' : 'ENTER') : <div className="wax-seal"></div>}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
              <hr style={{ flex: 1, border: '0.5px solid #444' }} />
              <span style={{ padding: '0 10px', color: '#666', fontSize: '0.8rem' }}>OR</span>
              <hr style={{ flex: 1, border: '0.5px solid #444' }} />
            </div>

            <button 
              type="button" 
              className="btn-toggle-auth-prominent"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setMessage('');
              }}
            >
              {isRegistering ? 'Already have an account? Log In' : 'Need an account? Register Here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
