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
  precio?: number | string;
  estado?: string;
}

interface MyCauldronsPageProps {
  onCreateNew?: () => void;
  showMagicalAlert?: (message: string, type: 'success' | 'error' | 'warning' | 'confirm', onConfirm?: () => void) => void;
}

const MyCauldronsPage: React.FC<MyCauldronsPageProps> = ({ onCreateNew, showMagicalAlert }) => {
  const [cauldrons, setCauldrons] = useState<SavedCauldron[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseNote, setPurchaseNote] = useState('');
  const [selectedCauldron, setSelectedCauldron] = useState<SavedCauldron | null>(null);
  const [purchaseError, setPurchaseError] = useState('');

  const fetchCauldrons = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must log in to see your cauldrons');
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
        throw new Error('Could not load your cauldrons');
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
        'Are you sure you want to destroy this cauldron? Its magic will be lost forever.', 
        'confirm', 
        () => executeDelete(id)
      );
    } else {
      if (window.confirm('Are you sure you want to destroy this cauldron?')) {
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
        if (showMagicalAlert) showMagicalAlert('Could not delete the cauldron', 'error');
        else alert('Could not delete the cauldron');
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
      if (showMagicalAlert) showMagicalAlert('Connection error while trying to delete', 'error');
      else alert('Connection error while trying to delete');
    }
  };

  const openBuyModal = (cauldron: SavedCauldron) => {
    setSelectedCauldron(cauldron);
    setPurchaseNote('');
    setPurchaseError('');
    setIsPurchaseModalOpen(true);
  };

  const closeBuyModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedCauldron(null);
    setPurchaseError('');
  };

  const handleConfirmPurchase = async () => {
    if (!selectedCauldron) return;

    const token = localStorage.getItem('token');
    if (!token) {
      if (showMagicalAlert) {
        showMagicalAlert('You need to log in to buy a cauldron.', 'warning', () => window.location.href = '/login');
      } else {
        alert('You need to log in to buy a cauldron.');
      }
      return;
    }

    const endpoint = `/api/cauldrons/${selectedCauldron.id_caldero}/buy`;
    const baseUrl = 'https://the-hags-cauldron-back-end.onrender.com';
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          informacion: purchaseNote
        })
      });

      if (response.ok) {
        setCauldrons(prev => prev.map(c => c.id_caldero === selectedCauldron.id_caldero ? { ...c, estado: 'comprado' } : c));
        closeBuyModal();
        if (showMagicalAlert) showMagicalAlert('Purchase completed! Your cauldron is now marked as purchased.', 'success');
      } else {
        const data = await response.json();
        const message = data?.message || 'No se pudo procesar la compra';
        setPurchaseError(message);
      }
    } catch (err) {
      console.error('Error al comprar:', err);
      setPurchaseError('Error de conexión al procesar la compra');
    }
  };

  // Función para mapear imágenes según el género si no hay URL real
  const safePrice = (precio?: number | string): string => {
    const value = typeof precio === 'number'
      ? precio
      : precio ? parseFloat(precio.toString().replace(',', '.')) : NaN;
    return Number.isFinite(value) ? value.toFixed(2) : '0.00';
  };

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

  if (loading) return <div className="loading-screen">Mixing ingredients...</div>;

  return (
    <div className="my-cauldrons-page">
      <div className="cauldrons-container">
        <header className="cauldrons-header">
          <div className="title-section">
            <img src={cauldronIcon} alt="Cauldron Icon" className="floating-icon" />
            <div>
              <h1>My Saved Cauldrons</h1>
              <p>Your personal collection of game designs and potions.</p>
            </div>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-value">{cauldrons.length}</span>
              <span className="stat-label">Cauldrons</span>
            </div>
          </div>
        </header>

        {error && <div className="error-message">{error}</div>}

        <main className="cauldrons-list">
          {cauldrons.length > 0 ? (
            <div className="cauldrons-grid-layout">
              {cauldrons.map((cauldron) => (
                <div key={cauldron.id_caldero} className={`cauldron-card-item ${cauldron.estado === 'comprado' ? 'cauldron-card-item--bought' : ''}`}>
                  <div className="item-visual">
                    {cauldron.estado === 'comprado' && <div className="purchased-seal">👑</div>}
                    <img src={getCauldronImage(cauldron)} alt={cauldron.nombre} />
                  </div>
                  <div className="item-details">
                    <div className="item-header">
                      <span className="genre-label">{cauldron.genero}</span>
                      <span className="date-label">{new Date(cauldron.fecha_creacion).toLocaleDateString()}</span>
                    </div>
                    <h3>{cauldron.nombre}</h3>
                    <p>{cauldron.descripcion || 'Magic configuration pending...'}</p>
                    <div className="price-status-row">
                      {cauldron.precio !== undefined && (
                        <span className="price-label">Price: ${safePrice(cauldron.precio)}</span>
                      )}
                      <span className={`status-label ${cauldron.estado === 'comprado' ? 'status-bought' : 'status-pending'}`}>
                        {cauldron.estado ? cauldron.estado === 'comprado' ? 'PURCHASED' : 'PENDING' : 'PENDING'}
                      </span>
                    </div>
                    <div className="item-footer">
                      <div className="ingredients-count">
                        <img src={cauldronIcon} alt="Icon" className="small-icon" /> {cauldron.ingredientes} Ingredients
                      </div>
                      <div className="item-actions">
                        <button 
                          className={`action-btn ${cauldron.estado === 'comprado' ? 'buy-btn-disabled' : 'buy-btn'}`}
                          onClick={() => cauldron.estado !== 'comprado' && openBuyModal(cauldron)}
                          disabled={cauldron.estado === 'comprado'}
                        >
                          {cauldron.estado === 'comprado' ? '✓ Purchased' : 'Buy'}
                        </button>
                        <button className="action-btn edit-btn">Edit</button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(cauldron.id_caldero)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="cauldron-card-item empty-forge-card" onClick={() => onCreateNew ? onCreateNew() : window.location.href = '/'}>
                <div className="empty-vfx">✨</div>
                <h2>FORGE NEW CAULDRON</h2>
              </div>
            </div>
          ) : (
            <div className="cauldrons-grid-layout">
              <div className="cauldron-card-item empty-forge-card" onClick={() => onCreateNew ? onCreateNew() : window.location.href = '/'}>
                <div className="empty-vfx">✨</div>
                <h2>FORGE NEW CAULDRON</h2>
              </div>
            </div>
          )}
        </main>
      </div>

      {isPurchaseModalOpen && selectedCauldron && (
        <div className="purchase-modal-overlay" onClick={closeBuyModal}>
          <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
            <div className="purchase-modal-header">
              <h2>Buy Cauldron</h2>
              <button className="close-modal-btn" onClick={closeBuyModal} aria-label="Close dialog">×</button>
            </div>
            <p className="purchase-modal-subtitle">
              Add additional information about the game you want to build before confirming the purchase.
            </p>
            <div className="purchase-modal-content">
              <div className="purchase-summary">
                <strong>{selectedCauldron.nombre}</strong>
                <span>{selectedCauldron.genero}</span>
                <span>Price: ${safePrice(selectedCauldron.precio)}</span>
              </div>
              <label className="purchase-label" htmlFor="purchase-note">Game Description</label>
              <textarea
                id="purchase-note"
                className="purchase-textarea"
                value={purchaseNote}
                onChange={(e) => setPurchaseNote(e.target.value)}
                placeholder="Describe how you want the game to be: story, style, main mechanics..."
              />
              {purchaseError && <div className="purchase-error">{purchaseError}</div>}
            </div>
            <div className="purchase-modal-actions">
              <button className="action-btn cancel-btn" onClick={closeBuyModal}>Cancel</button>
              <button className="action-btn buy-btn" onClick={handleConfirmPurchase}>Confirm Purchase</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyCauldronsPage;
