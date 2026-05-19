/**
 * 📄 ARCHIVO: ConfiguratorPage.tsx
 * 📝 DESCRIPCIÓN: Página principal del configurador de ingredientes y creación de pociones.
 *
 * CAMBIOS:
 * - Nuevas props: cauldronName, onCauldronNameChange, onSave
 * - Input de nombre encima del .configurator-header
 * - Botones "Volver" y "Guardar Caldero" en fila horizontal dentro de .cauldron-buttons
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
  /** Nombre que el usuario escribe para su caldero */
  cauldronName: string;
  onCauldronNameChange: (name: string) => void;
  /** Callback para el botón Guardar Caldero */
  onSave: () => void;
}

const ConfiguratorPage: React.FC<ConfiguratorPageProps> = ({
  selections,
  particles,
  selectedGenre,
  isFusionReady,
  toggleOption,
  onBack,
  onCreateGame,
  cauldronName,
  onCauldronNameChange,
  onSave,
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
          title="Design"
          cornerClass="corner-tl"
          selections={selections}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="tematica"
          title="Theme"
          cornerClass="corner-tr"
          selections={selections}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="mecanicas"
          title="Mechanics"
          cornerClass="corner-bl"
          selections={selections}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="sonido"
          title="Sound"
          cornerClass="corner-br"
          selections={selections}
          toggleOption={toggleOption}
        />

        {/* Input de nombre — encima del header, centrado en el flujo flex */}
        <input
          type="text"
          className="cauldron-name-input"
          placeholder="Your cauldron name..."
          value={cauldronName}
          onChange={(e) => onCauldronNameChange(e.target.value)}
          maxLength={60}
        />

        {/* Título centrado */}
        <div className="configurator-header">
          <h1 className="configurator-title">Create Your Magical Game</h1>
          <p className="configurator-subtitle">Select ingredients for your potion</p>
        </div>

        {/* Dashboard central: caldero + botones en columna */}
        <div className="center-dashboard">

          {/* Partículas (position: fixed, no afecta al flujo) */}
          <ParticleEffect particles={particles} />

          {/* Caldero — anclado por la base dentro de su wrapper */}
          <Cauldron selectedGenre={selectedGenre} isFusionReady={isFusionReady} />

          {/* Botones debajo del caldero */}
          <div className="cauldron-buttons">

            {/* Botón principal: Crear Juego — ocupa su propia fila */}
            <button className="btn-create-game" onClick={onCreateGame}>
              Create Game
            </button>

            {/* Fila inferior: Volver + Guardar Caldero */}
            <div className="cauldron-buttons-row">
              <button className="btn-back-game" onClick={onBack}>
                Back
              </button>
              <button className="btn-save-game" onClick={onSave}>
                Save Cauldron
              </button>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ConfiguratorPage;