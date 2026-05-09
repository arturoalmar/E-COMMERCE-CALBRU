import React, { useState } from 'react';
import './MyCauldronsPage.css';
import Footer from '../components/Footer/Footer';

// Import assets
import cauldronIcon from '../assets/Icon.png';
import cauldronCards from '../assets/cards_cauldron.png';
import cauldronJump from '../assets/jump__cauldron.png';
import cauldronParty from '../assets/party_cauldron.png';
import cauldronSurvivor from '../assets/survivor_cauldron.png';

interface SavedCauldron {
  id: string;
  name: string;
  description: string;
  image: string;
  genre: string;
  date: string;
  rarity: 'Común' | 'Raro' | 'Legendario';
  ingredients: number;
}

const INITIAL_CAULDRONS: SavedCauldron[] = [
  {
    id: '1',
    name: 'Elixir de Naipes',
    description: 'Diseño estratégico basado en mazos de cartas y azar controlado.',
    image: cauldronCards,
    genre: 'Cartas',
    date: '08/05/2024',
    rarity: 'Legendario',
    ingredients: 12
  },
  {
    id: '2',
    name: 'Salto Gravitacional',
    description: 'Plataformas desafiantes con cambios de gravedad en tiempo real.',
    image: cauldronJump,
    genre: 'Salto',
    date: '05/05/2024',
    rarity: 'Raro',
    ingredients: 8
  },
  {
    id: '3',
    name: 'Bazar del Caos',
    description: 'Colección de minijuegos para fiestas con hasta 4 jugadores.',
    image: cauldronParty,
    genre: 'Party',
    date: '01/05/2024',
    rarity: 'Común',
    ingredients: 15
  },
  {
    id: '4',
    name: 'Senda de la Bruja',
    description: 'Survival horror con elementos de recolección y crafteo místico.',
    image: cauldronSurvivor,
    genre: 'Survivor',
    date: '28/04/2024',
    rarity: 'Legendario',
    ingredients: 24
  }
];

const MyCauldronsPage: React.FC = () => {
  const [cauldrons, setCauldrons] = useState<SavedCauldron[]>(INITIAL_CAULDRONS);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres destruir este caldero?')) {
      setCauldrons(cauldrons.filter(c => c.id !== id));
    }
  };

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

        <main className="cauldrons-list">
          {cauldrons.length > 0 ? (
            <div className="shelves-container">
              {Array.from({ length: Math.ceil(cauldrons.length / 3) }).map((_, shelfIndex) => (
                <div key={shelfIndex} className="cauldron-shelf">
                  <div className="shelf-plank"></div>
                  <div className="shelf-items">
                    {cauldrons.slice(shelfIndex * 3, shelfIndex * 3 + 3).map((cauldron) => (
                      <div key={cauldron.id} className={`cauldron-item rarity-${cauldron.rarity.toLowerCase()}`}>
                        <div className="item-visual">
                          <img src={cauldron.image} alt={cauldron.name} />
                          <div className="rarity-tag">{cauldron.rarity}</div>
                        </div>
                        <div className="item-details">
                          <div className="item-header">
                            <span className="genre-label">{cauldron.genre}</span>
                            <span className="date-label">{cauldron.date}</span>
                          </div>
                          <h3>{cauldron.name}</h3>
                          <p>{cauldron.description}</p>
                          <div className="item-footer">
                            <div className="ingredients-count">
                              <span>🧪</span> {cauldron.ingredients} Ingredientes
                            </div>
                            <div className="item-actions">
                              <button className="action-btn edit-btn">Editar</button>
                              <button className="action-btn delete-btn" onClick={() => handleDelete(cauldron.id)}>
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
