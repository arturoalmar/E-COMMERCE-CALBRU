/**
 * 📄 ARCHIVO: EditConfiguratorPage.tsx
 * 📝 DESCRIPCIÓN: Copia de ConfiguratorPage adaptada para el flujo de edición.
 *   — Botón principal: "Confirm Changes" (en vez de "Create Game")
 *   — Sin popup de demo: al confirmar se llama directamente a onUpdate
 *   — Sin botón "Save Cauldron" (el flujo de edición usa onUpdate)
 */

import React from 'react';
import type { AttributeOptionsMap, ConfigCategory, Genre, Particle, OptionsMap } from '../types';
import '../Adding-Ingredients/AddingIngredients.css';

import Cauldron from '../Adding-Ingredients/Cauldron';
import OptionsShelf from '../Adding-Ingredients/OptionsShelf';
import ParticleEffect from '../Adding-Ingredients/ParticleEffect';
import Footer from '../components/Footer/Footer';
import fondoCreacion from '../assets/fondo creación de juego.png';

interface EditConfiguratorPageProps {
  selections: OptionsMap;
  particles: Particle[];
  selectedGenre: Genre | null;
  isFusionReady: boolean;
  toggleOption: (category: ConfigCategory, optionId: string) => void;
  onBack: () => void;
  onUpdate: () => void;
  cauldronName: string;
  onCauldronNameChange: (name: string) => void;
  attributeOptions: AttributeOptionsMap;
}

const EditConfiguratorPage: React.FC<EditConfiguratorPageProps> = ({
  selections,
  particles,
  selectedGenre,
  isFusionReady,
  toggleOption,
  onBack,
  onUpdate,
  cauldronName,
  onCauldronNameChange,
  attributeOptions,
}) => {
  return (
    <>
      <div
        className="configurator-bg"
        style={{ backgroundImage: `url("${fondoCreacion}")` }}
      />

      <div className="configurator-layout">

        <OptionsShelf
          category="diseno"
          title="Design"
          cornerClass="corner-tl"
          selections={selections}
          options={attributeOptions.diseno}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="tematica"
          title="Theme"
          cornerClass="corner-tr"
          selections={selections}
          options={attributeOptions.tematica}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="mecanicas"
          title="Mechanics"
          cornerClass="corner-bl"
          selections={selections}
          options={attributeOptions.mecanicas}
          toggleOption={toggleOption}
        />
        <OptionsShelf
          category="sonido"
          title="Sound"
          cornerClass="corner-br"
          selections={selections}
          options={attributeOptions.sonido}
          toggleOption={toggleOption}
        />

        <input
          type="text"
          className="cauldron-name-input"
          placeholder="Your cauldron name..."
          value={cauldronName}
          onChange={(e) => onCauldronNameChange(e.target.value)}
          maxLength={60}
        />

        <div className="configurator-header">
          <h1 className="configurator-title">Edit Your Magical Game</h1>
          <p className="configurator-subtitle">Adjust the ingredients of your potion</p>
        </div>

        <div className="center-dashboard">

          <ParticleEffect particles={particles} />

          <Cauldron selectedGenre={selectedGenre} isFusionReady={isFusionReady} />

          <div className="cauldron-buttons">

            <button className="btn-create-game" onClick={onUpdate}>
              Confirm Changes
            </button>

            <div className="cauldron-buttons-row">
              <button className="btn-back-game" onClick={onBack}>
                Back
              </button>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditConfiguratorPage;
