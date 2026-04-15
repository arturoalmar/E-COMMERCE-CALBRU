import { useState } from 'react';
import './App.css';

type Step = 'select-pot' | 'configurator';
type OptionsMap = Record<string, string[]>;

interface Genre {
  id: string;
  name: string;
  description: string;
}

const GENRES: Genre[] = [
  { id: 'cards', name: 'Juego de Cartas', description: 'Construye tu mazo perfecto, crea sinergias y derrota a tus rivales con estrategia pura.' },
  { id: 'platformer', name: 'Plataformas', description: 'Saltos precisos, niveles desafiantes y mundos vibrantes llenos de secretos.' },
  { id: 'party', name: 'Estilo Mario Party', description: 'Minijuegos frenéticos, amigos traicioneros y mucha diversión multijugador local.' },
  { id: 'survivor', name: 'Estilo Vampire Survivor', description: 'Hordas interminables, mejoras auto-disparadas y caos en pantalla hasta el último segundo.' },
];

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('select-pot');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  // States to hold the selected options for each characteristic
  const [selections, setSelections] = useState<OptionsMap>({
    diseno: [],
    tematica: [],
    mecanicas: [],
    plataforma: []
  });

  // Oracle AI States
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [oracleQuery, setOracleQuery] = useState('');
  const [oracleResponses, setOracleResponses] = useState<{role: 'user'|'oracle', text: string}[]>([
    { role: 'oracle', text: 'Soy el Espíritu del Caldero... Pregúntame si tus combinaciones de ingredientes tienen sentido. Por ejemplo: "¿Es buena idea un parry en un juego de cartas?"' }
  ]);
  const [isOracleThinking, setIsOracleThinking] = useState(false);

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentStep('configurator');
    // Reset selections on new genre
    setSelections({ diseno: [], tematica: [], mecanicas: [], plataforma: [] });
  };

  const toggleOption = (category: string, optionId: string) => {
    setSelections((prev) => {
      const currentSelections = prev[category];
      const isSelected = currentSelections.includes(optionId);
      
      const newSelections = isSelected
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId];
        
      return { ...prev, [category]: newSelections };
    });
  };

  const askOracle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oracleQuery.trim()) return;

    const userText = oracleQuery;
    setOracleResponses(prev => [...prev, { role: 'user', text: userText }]);
    setOracleQuery('');
    setIsOracleThinking(true);

    // Simulated AI response (Here you could connect OpenAI/Gemini easily)
    setTimeout(() => {
      let aiResponse = "El humo del caldero es espeso... (Conecta aquí una API de IA como OpenAI o Gemini para respuestas reales infinitas).";
      const q = userText.toLowerCase();

      // Smart mock heuristic responses
      if (q.includes('parry') && q.includes('cartas')) {
        aiResponse = "¡Una idea fascinante! Un 'parry' en un juego de cartas podría implementarse como una mecánica de 'contraataque instantáneo'. Si un rival te ataca, revelar una carta de Parry en ese exacto segundo podría no solo anular el daño, sino devolverlo. Añade mucha tensión y habilidad mental.";
      } else if (q.includes('vampire') && q.includes('cartas')) {
        aiResponse = "Combinar auto-shooters con cartas es rompedor. Tus cartas podrían ser las armas que orbitan alrededor del personaje, y robas nuevas cartas del mazo cada vez que subes de nivel.";
      } else if (q.includes('mecanica') || q.includes('idea')) {
        aiResponse = "Las mejores mecánicas son aquellas que recompensan al jugador por tomar riesgos. Si esa idea encaja con tu base de juego, ¡échala al caldero sin miedo!";
      }

      setOracleResponses(prev => [...prev, { role: 'oracle', text: aiResponse }]);
      setIsOracleThinking(false);
    }, 2000);
  };

  const isFusionReady = 
    selections.diseno.length > 0 || 
    selections.tematica.length > 0 ||
    selections.mecanicas.length > 0 ||
    selections.plataforma.length > 0;

  const renderSelectionStep = () => (
    <>
      <header>
        <h1>La Choza de la Bruja</h1>
        <p>Acércate al caldero... Selecciona la poción base de tu videojuego.</p>
      </header>
      <div className="genre-grid">
        {GENRES.map((genre) => (
          <div key={genre.id} className="genre-card">
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
            <button 
              className="btn-select" 
              onClick={() => handleSelectGenre(genre)}
            >
              Echar al Caldero
            </button>
          </div>
        ))}
      </div>
    </>
  );

  // Options mock generators (12 default items for the 4x3 grids)
  const generateOptionsGrid = (category: string, title: string, cornerClass: string) => {
    // Generates 12 generic option blocks matching the user's sketch layout
    const options = Array.from({ length: 12 }).map((_, i) => ({
      id: `${category}-${i + 1}`,
      label: `Opción ${i + 1}`
    }));

    return (
      <div className={`config-corner ${cornerClass}`}>
        <h3>{title}</h3>
        <div className="options-grid">
          {options.map((opt) => (
            <button
              key={opt.id}
              className={`option-btn ${selections[category].includes(opt.id) ? 'selected' : ''}`}
              onClick={() => toggleOption(category, opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderConfiguratorStep = () => (
    <div className="configurator-layout">
      {generateOptionsGrid('diseno', 'Diseño Gráfico', 'corner-tl')}
      {generateOptionsGrid('tematica', 'Temática', 'corner-tr')}
      {generateOptionsGrid('mecanicas', 'Mecánicas Extra', 'corner-bl')}
      {generateOptionsGrid('plataforma', 'Banda Sonora', 'corner-br')}

      <div className="center-dashboard">
        <div>
          <h2>El Gran Caldero</h2>
          {selectedGenre && (
            <span className="selected-genre-badge">Poción Base: {selectedGenre.name}</span>
          )}
        </div>
        
        <div className="status-preview">
          {isFusionReady ? (
            <p>Los ingredientes reaccionan... ¡El conjuro está listo!</p>
          ) : (
            <p>Añade ingredientes de las estanterías (esquinas) a la mezcla...</p>
          )}
        </div>

        <button 
          className="btn-fusionar" 
          disabled={!isFusionReady}
          onClick={() => alert('¡Lanzando HECHIZO DE CREACIÓN!')}
        >
          ¡CONJURAR JUEGO!
        </button>
      </div>
    </div>
  );

  const renderOracle = () => (
    <div className={`oracle-container ${isOracleOpen ? 'open' : ''}`}>
      <div className="oracle-toggle" onClick={() => setIsOracleOpen(!isOracleOpen)}>
        <span className="crystal-ball">🔮</span> 
        {isOracleOpen ? 'Ocultar Oráculo' : 'Consultar al Oráculo (IA)'}
      </div>
      
      {isOracleOpen && (
        <div className="oracle-chatWindow">
          <div className="oracle-messages">
            {oracleResponses.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <strong>{msg.role === 'oracle' ? '🔮 Oráculo:' : 'Tú:'}</strong> {msg.text}
              </div>
            ))}
            {isOracleThinking && (
              <div className="message oracle thinking">
                <em>El Oráculo está consultando los astros...</em>
              </div>
            )}
          </div>
          <form className="oracle-input" onSubmit={askOracle}>
            <input 
              type="text" 
              placeholder="Pregunta sobre mecánicas, balances..." 
              value={oracleQuery}
              onChange={(e) => setOracleQuery(e.target.value)}
              disabled={isOracleThinking}
            />
            <button type="submit" disabled={isOracleThinking || !oracleQuery.trim()}>
              Consultar
            </button>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div className="app-container">
      {currentStep === 'select-pot' && renderSelectionStep()}
      {currentStep === 'configurator' && (
        <>
          {renderConfiguratorStep()}
          <button 
            className="btn-back" 
            onClick={() => setCurrentStep('select-pot')}
          >
            ← Volver a los calderos
          </button>
        </>
      )}
      {renderOracle()}
    </div>
  );
}

export default App;
