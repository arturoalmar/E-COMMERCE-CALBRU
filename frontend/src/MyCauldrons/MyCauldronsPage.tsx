import React, { useState, useEffect } from 'react';
const API_BASE = 'http://localhost:5000';
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
  onEditCauldron?: (data: { id: string | number; nombre: string; genero: string; descripcion: string; precio?: number | string }) => void;
  showMagicalAlert?: (message: string, type: 'success' | 'error' | 'warning' | 'confirm', onConfirm?: () => void) => void;
}

const MyCauldronsPage: React.FC<MyCauldronsPageProps> = ({ onCreateNew, onEditCauldron, showMagicalAlert }) => {
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
      setError('You must log in to see your cauldrons.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/cauldrons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401 || response.status === 403) {
        // Token expirado o sin id — limpiar sesión y pedir login
        localStorage.removeItem('token');
        setError('Your session has expired. Please log in again.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const body = await response.text();
        console.error('GET /api/cauldrons error:', response.status, body);
        throw new Error(`Server error (${response.status}): ${body}`);
      }

      const data = await response.json();
      setCauldrons(data);
    } catch (err: any) {
      console.error('fetchCauldrons caught:', err);
      setError(err.message || 'Could not load your cauldrons.');
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
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
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
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
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
              <img src={cauldronIcon} alt="Cauldron Icon" className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{cauldrons.length}</span>
                <span className="stat-label">CAULDRONS</span>
              </div>
            </div>
          </div>
        </header>

        {error && <div className="error-message">{error}</div>}

        <main className="cauldrons-list">
          {(() => {
            const itemsPerRow = 3;
            const combinedItems: any[] = [...cauldrons, { isEmptySlot: true }];
            const chunkedRows = [];
            for (let i = 0; i < combinedItems.length; i += itemsPerRow) {
              chunkedRows.push(combinedItems.slice(i, i + itemsPerRow));
            }

            return chunkedRows.map((row, rowIndex) => (
              <div className="shelf-row" key={`row-${rowIndex}`}>
                <div className="shelf-content">
                  {row.map((item, itemIndex) => {
                    if (item.isEmptySlot) {
                      return (
                        <div className="empty-slot" key="empty" onClick={() => onCreateNew?.()}>
                          <div className="empty-circle">+</div>
                          <span>Forge New Cauldron</span>
                        </div>
                      );
                    }

                    const c = item as SavedCauldron;
                    return (
                      <div className="cauldron-item" key={c.id_caldero}>
                        {c.estado === 'comprado' && <div className="crown">👑</div>}
                        <div className="cauldron-img-wrap">
                          <div className="smoke"><span/><span/><span/></div>
                          <img src={getCauldronImage(c)} alt={c.nombre} />
                        </div>
                        <div className="scroll-label">
                          <div className="scroll-header">
                            <span className="scroll-genre">{c.genero}</span>
                            <span className="scroll-date">{new Date(c.fecha_creacion).toLocaleDateString()}</span>
                          </div>
                          <h3 className="scroll-title">{c.nombre}</h3>
                          <p className="scroll-desc">{c.descripcion || 'No ingredients added yet'}</p>
                          <div className="scroll-price-row">
                            {c.precio !== undefined && (
                              <span className="scroll-price">Price: ${safePrice(c.precio)}</span>
                            )}
                            <span className={`scroll-status ${c.estado === 'comprado' ? 'scroll-status-bought' : 'scroll-status-pending'}`}>
                              {c.estado === 'comprado' ? 'PURCHASED' : 'PENDING'}
                            </span>
                          </div>
                          <div className="scroll-footer">
                            <div className="scroll-ingredients">
                              <span className="checkbox-icon">☐</span> {c.ingredientes} ingredients
                            </div>
                            <div className="scroll-actions">
                              <button 
                                className={`scroll-btn ${c.estado === 'comprado' ? 'scroll-buy-disabled' : 'scroll-buy'}`}
                                onClick={() => c.estado !== 'comprado' && openBuyModal(c)}
                                disabled={c.estado === 'comprado'}
                              >
                                {c.estado === 'comprado' ? '✓ Purchased' : 'Buy'}
                              </button>
                              <button
                                className="scroll-btn scroll-edit"
                                onClick={() => onEditCauldron?.({
                                  id: c.id_caldero,
                                  nombre: c.nombre,
                                  genero: c.genero,
                                  descripcion: c.descripcion,
                                  precio: c.precio
                                })}
                              >Edit</button>
                              <button className="scroll-btn scroll-delete" onClick={() => handleDelete(c.id_caldero)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="shelf-plank" />
              </div>
            ));
          })()}
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
