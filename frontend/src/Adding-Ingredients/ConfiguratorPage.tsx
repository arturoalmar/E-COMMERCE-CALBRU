/**
 * 📄 ARCHIVO: ConfiguratorPage.tsx
 * 📝 DESCRIPCIÓN: Página principal del configurador de ingredientes y creación de pociones.
 */

// ConfiguratorPage.tsx
// Página donde el usuario combina ingredientes sobre el caldero.
// Presenta las estanterías de opciones, el efecto de partículas y el estado de la fusión.

import React from 'react';
import { ConfigCategory, Genre, Particle, OptionsMap } from '../types';
import './AddingIngredients.css';

import Cauldron from './Cauldron';
import OptionsShelf from './OptionsShelf';
import ParticleEffect from './ParticleEffect';
import Footer from '../components/Footer/Footer';
import fondoCreacion from '../assets/fondo creación de juego.png';

// SECCIÓN: Definición de datos/propiedades
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
  // SECCIÓN: Renderizado visual
  return (
    <>
      <div
        className="configurator-bg"
        style={{ backgroundImage: `url("${fondoCreacion}")` }}
      />
      <div className="configurator-layout">
        {/* Botón volver arriba a la izquierda */}
      

        <OptionsShelf category="diseno" title="Diseño" cornerClass="corner-tl" selections={selections} toggleOption={toggleOption} />
        <OptionsShelf category="tematica" title="Temática" cornerClass="corner-tr" selections={selections} toggleOption={toggleOption} />
        <OptionsShelf category="mecanicas" title="Mecánicas" cornerClass="corner-bl" selections={selections} toggleOption={toggleOption} />
        <OptionsShelf category="sonido" title="Sonido" cornerClass="corner-br" selections={selections} toggleOption={toggleOption} />

        <div className="configurator-header">
          <h1 className="configurator-title">Crea tu Juego Mágico</h1>
          <p className="configurator-subtitle">Selecciona los ingredientes para tu poción</p>
        </div>

        {/* El Dashboard Central: El Caldero Mágico */}
        <div className="center-dashboard">
          <ParticleEffect particles={particles} />
          <Cauldron selectedGenre={selectedGenre} isFusionReady={isFusionReady} />
          <button className="btn-create-game" onClick={onCreateGame}>Crear Juego</button>
          <button className="btn-back-game" onClick={onBack}>Volver</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfiguratorPage;
