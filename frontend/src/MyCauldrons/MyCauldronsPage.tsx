import React, { useState, useEffect } from 'react';
import './MyCauldronsPage.css';
import Footer from '../components/Footer/Footer';

// Import assets for mapping or fallback
import cauldronIcon from '../assets/Icon.png';
import cauldronCards from '../assets/cards_cauldron.png';
import cauldronJump from '../assets/jump__cauldron.png';
import cauldronParty from '../assets/party_cauldron.png';
import cauldronSurvivor from '../assets/survivor_cauldron.png';

interface SavedCauldron {
  id_caldero: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  genero: string;
  fecha_creacion: string;
  ingredientes: number;
}

interface MyCauldronsPageProps {
  onCreateNew?: () => void;
  showMagicalAlert?: (message: string, type: 'success' | 'error' | 'warning' | 'confirm', onConfirm?: () => void) => void;
}

const MyCauldronsPage: React.FC<MyCauldronsPageProps> = ({ onCreateNew, showMagicalAlert }) => {
  const [cauldrons, setCauldrons] = useState<SavedCauldron[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCauldrons = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para ver tus calderos');
      setLoading(false);
      return;
    }

    const endpoint = '/api/cauldrons';
    const baseUrl = 'https://the-hags-cauldron-back-end.onrender.com';
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('No se pudieron cargar tus calderos');
      }

      const data = await response.json();
      setCauldrons(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCauldrons();
  }, []);

  const handleDelete = (id: number) => {
    if (showMagicalAlert) {
      showMagicalAlert(
        '¿Estás seguro de que quieres destruir este caldero? Su magia se perderá para siempre.', 
        'confirm', 
        () => executeDelete(id)
      );
    } else {
      if (window.confirm('¿Estás seguro de que quieres destruir este caldero?')) {
        executeDelete(id);
      }
    }
  };

  const executeDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    const endpoint = `/api/cauldrons/${id}`;
    const baseUrl = 'https://the-hags-cauldron-back-end.onrender.com';
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCauldrons(prev => prev.filter(c => c.id_caldero !== id));
      } else {
        if (showMagicalAlert) showMagicalAlert('No se pudo eliminar el caldero', 'error');
        else alert('No se pudo eliminar el caldero');
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
      if (showMagicalAlert) showMagicalAlert('Error de conexión al intentar eliminar', 'error');
      else alert('Error de conexión al intentar eliminar');
    }
  };

  // Función para mapear imágenes según el género si no hay URL real
  const getCauldronImage = (cauldron: SavedCauldron) => {
    if (cauldron.imagen_url && cauldron.imagen_url.startsWith('http')) {
      return cauldron.imagen_url;
    }
    
    // Mapeo por género como fallback (basado en los nombres de tipos_juego en la DB)
    const genre = cauldron.genero.toLowerCase();
    
    if (genre.includes('cartas')) return cauldronCards;
    if (genre.includes('plataformas')) return cauldronJump;
    if (genre.includes('party')) return cauldronParty;
    if (genre.includes('survivor')) return cauldronSurvivor;
    
    return cauldronIcon;
  };

  if (loading) return <div className="loading-screen">Mezclando ingredientes...</div>;

  return (
    <div className="my-cauldrons-page">
      <div className="cauldrons-container">
        <header className="cauldrons-header">
          <div className="title-section">
            <img src={cauldronIcon} alt="Cauldron Icon" className="floating-icon" />
            <div>
              <h1>Mis Calderos Guardados</h1>
              <p>Tu colección personal de diseños y pócimas de juego.</p>
            </div>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-value">{cauldrons.length}</span>
              <span className="stat-label">Calderos</span>
            </div>
          </div>
        </header>

        {error && <div className="error-message">{error}</div>}

        <main className="cauldrons-list">
          {cauldrons.length > 0 ? (
            <div className="cauldrons-grid-layout">
              {cauldrons.map((cauldron) => (
                <div key={cauldron.id_caldero} className="cauldron-card-item">
                  <div className="item-visual">
                    <img src={getCauldronImage(cauldron)} alt={cauldron.nombre} />
                  </div>
                  <div className="item-details">
                    <div className="item-header">
                      <span className="genre-label">{cauldron.genero}</span>
                      <span className="date-label">{new Date(cauldron.fecha_creacion).toLocaleDateString()}</span>
                    </div>
                    <h3>{cauldron.nombre}</h3>
                    <p>{cauldron.descripcion || 'Configuración mágica en espera...'}</p>
                    <div className="item-footer">
                      <div className="ingredients-count">
                        <img src={cauldronIcon} alt="Icono" className="small-icon" /> {cauldron.ingredientes} Ingredientes
                      </div>
                      <div className="item-actions">
                        <button className="action-btn edit-btn">Editar</button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(cauldron.id_caldero)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="cauldron-card-item empty-forge-card" onClick={() => onCreateNew ? onCreateNew() : window.location.href = '/'}>
                <div className="empty-vfx">✨</div>
                <h2>FORJAR NUEVO CALDERO</h2>
              </div>
            </div>
          ) : (
            <div className="cauldrons-grid-layout">
              <div className="cauldron-card-item empty-forge-card" onClick={() => onCreateNew ? onCreateNew() : window.location.href = '/'}>
                <div className="empty-vfx">✨</div>
                <h2>FORJAR NUEVO CALDERO</h2>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyCauldronsPage;
