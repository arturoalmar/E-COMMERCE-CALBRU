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

const MyCauldronsPage: React.FC = () => {
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

    try {
      const response = await fetch('http://localhost:5000/api/cauldrons', {
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

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres destruir este caldero?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/cauldrons/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCauldrons(cauldrons.filter(c => c.id_caldero !== id));
      } else {
        alert('No se pudo eliminar el caldero');
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error de conexión al intentar eliminar');
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
            <div className="shelves-container">
              {Array.from({ length: Math.ceil(cauldrons.length / 3) }).map((_, shelfIndex) => (
                <div key={shelfIndex} className="cauldron-shelf">
                  <div className="shelf-plank"></div>
                  <div className="shelf-items">
                    {cauldrons.slice(shelfIndex * 3, shelfIndex * 3 + 3).map((cauldron) => (
                      <div key={cauldron.id_caldero} className="cauldron-item">
                        <div className="item-visual">
                          <img src={getCauldronImage(cauldron)} alt={cauldron.nombre} />
                        </div>
                        <div className="item-details">
                          <div className="item-header">
                            <span className="genre-label">{cauldron.genero}</span>
                            <span className="date-label">{new Date(cauldron.fecha_creacion).toLocaleDateString()}</span>
                          </div>
                          <h3>{cauldron.nombre}</h3>
                          <p>{cauldron.descripcion}</p>
                          <div className="item-footer">
                            <div className="ingredients-count">
                              <span>🧪</span> {cauldron.ingredientes} Ingredientes
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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-vfx">✨</div>
              <h2>Tu archivo está vacío</h2>
              <p>Parece que aún no has forjado ningún caldero en la choza.</p>
              <button className="create-btn">Forjar Nuevo Caldero</button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyCauldronsPage;
