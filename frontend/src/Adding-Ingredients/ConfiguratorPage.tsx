/**
 * 📄 ARCHIVO: ConfiguratorPage.tsx
 */

import React, { useState } from 'react';
import type { AttributeOptionsMap, ConfigCategory, Genre, Particle, OptionsMap } from '../types';
import './AddingIngredients.css';
import DemoLoadingScreen from './DemoLoadingScreen';

import Cauldron from './Cauldron';
import OptionsShelf from './OptionsShelf';
import ParticleEffect from './ParticleEffect';
import Footer from '../components/Footer/Footer';
import MagicalAlert from '../components/MagicalAlert/MagicalAlert';
import fondoCreacion from '../assets/fondo creación de juego.png';

import { resolveLabels } from './GamePreview';

interface ConfiguratorPageProps {
  selections: OptionsMap;
  particles: Particle[];
  selectedGenre: Genre | null;
  isFusionReady: boolean;
  toggleOption: (category: ConfigCategory, optionId: string) => void;
  onBack: () => void;
  onCreateGame: () => void;
  cauldronName: string;
  onCauldronNameChange: (name: string) => void;
  onSave: () => void;
  attributeOptions: AttributeOptionsMap;
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
  attributeOptions,
}) => {
  const [showDemoAlert, setShowDemoAlert] = useState(false);
  const [generatingDemo, setGeneratingDemo] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);

  const handleCreateGameClick = () => {
    setShowDemoAlert(true);
  };

  const handleTryDemo = async () => {
    setShowDemoAlert(false);
    setGeneratingDemo(true);
    setDemoError(null);

    const resolved = resolveLabels(selections, attributeOptions);

    try {
      const res = await fetch('http://localhost:5000/api/game/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          genre: selectedGenre?.name || 'aventura',
          diseno: resolved.diseno,
          tematica: resolved.tematica,
          mecanicas: resolved.mecanicas,
          sonido: resolved.sonido,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDemoError(data.message || 'Unknown error');
        return;
      }

      const blob = new Blob([data.html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

    } catch (e) {
      setDemoError('Could not connect to the server. Is the backend running?');
    } finally {
      setGeneratingDemo(false);
    }
  };

  const handleContinue = () => {
    setShowDemoAlert(false);
    onCreateGame();
  };

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
          <h1 className="configurator-title">Create Your Magical Game</h1>
          <p className="configurator-subtitle">Select ingredients for your potion</p>
        </div>

        <div className="center-dashboard">

          <ParticleEffect particles={particles} />

          <Cauldron selectedGenre={selectedGenre} isFusionReady={isFusionReady} />

          <div className="cauldron-buttons">

            <button className="btn-create-game" onClick={handleCreateGameClick}>
              Create Game
            </button>

            {generatingDemo && <DemoLoadingScreen />}

            {demoError && (
              <p style={{ color: '#f87171', fontSize: '0.9rem', textAlign: 'center' }}>
                ❌ {demoError}
              </p>
            )}

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

      {/* Pop-up de decisión */}
      <MagicalAlert
        isOpen={showDemoAlert}
        message="Do you want to try a demo of your game before continuing?"
        type="confirm"
        confirmText="Try Demo"
        cancelText="➡️ Continue"
        onConfirm={handleTryDemo}
        onCancel={handleContinue}
      />
    </>
  );
};

export default ConfiguratorPage;