/**
 * 📄 ARCHIVO: ConfiguratorPage.tsx
 * 📝 DESCRIPCIÓN: Página principal del configurador de ingredientes y creación de pociones.
 *
 * CAMBIOS:
 * - Los botones "Crear Juego" y "Volver" se envuelven en <div className="cauldron-buttons">
 *   para que el CSS flexbox los coloque correctamente debajo del caldero.
 * - Se elimina el transformY hardcodeado del header; ahora se controla desde CSS.
 * - El configurator-header se mantiene fuera del center-dashboard para no
 *   interferir en el flujo flex del caldero + botones.
 */

import React from 'react';
import { ConfigCategory, Genre, Particle, OptionsMap } from '../types';
import './AddingIngredients.css';

import Cauldron from './Cauldron';
import OptionsShelf from './OptionsShelf';
import ParticleEffect from './ParticleEffect';
import Footer from '../components/Footer/Footer';
import fondoCreacion from '../assets/fondo creación de juego.png';

interface ConfiguratorPageProps {
  selections: OptionsMap;
  particles: Particle[];
  selectedGenre: Genre | null;
  isFusionReady: boolean;
  toggleOption: (category: ConfigCategory, optionId: string) => void;
  onBack: () => void;
  onCreateGame: () => void;
}

const ConfiguratorPage: React.FC<ConfiguratorPageProps> = ({
  selections,
  particles,
  selectedGenre,
  isFusionReady,
  toggleOption,
  onBack,
  onCreateGame
}) => {
  return (
    <>
      {/* Fondo */}
      <div
        className="configurator-bg"
        style={{ backgroundImage: `url("${fondoCreacion}")` }}
      />

      <div className="configurator-layout">

        {/* Paneles de ingredientes en las 4 esquinas (position: absolute) */}
        <OptionsShelf
          category="diseno"
          title="Diseño"
          cornerClass="corner-tl"
          selections={selections}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="tematica"
          title="Temática"
          cornerClass="corner-tr"
          selections={selections}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="mecanicas"
          title="Mecánicas"
          cornerClass="corner-bl"
          selections={selections}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="sonido"
          title="Sonido"
          cornerClass="corner-br"
          selections={selections}
          toggleOption={toggleOption}
        />

        {/* Título centrado — en flujo normal del flex, se muestra arriba del caldero */}
        <div className="configurator-header">
          <h1 className="configurator-title">Crea tu Juego Mágico</h1>
          <p className="configurator-subtitle">Selecciona los ingredientes para tu poción</p>
        </div>

        {/* Dashboard central: caldero + botones en columna */}
        <div className="center-dashboard">

          {/* Partículas (position: fixed, no afecta al flujo) */}
          <ParticleEffect particles={particles} />

          {/* Caldero — anclado por la base dentro de su wrapper */}
          <Cauldron selectedGenre={selectedGenre} isFusionReady={isFusionReady} />

          {/* Botones debajo del caldero, en flujo normal */}
          <div className="cauldron-buttons">
            <button className="btn-create-game" onClick={onCreateGame}>
              Crear Juego
            </button>
            <button className="btn-back-game" onClick={onBack}>
              Volver
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ConfiguratorPage;