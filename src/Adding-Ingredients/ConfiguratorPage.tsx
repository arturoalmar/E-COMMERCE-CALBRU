import React from 'react';
import { Genre, Particle, OptionsMap } from '../types';
import Cauldron from './Cauldron';
import OptionsShelf from './OptionsShelf';
import ParticleEffect from './ParticleEffect';

interface ConfiguratorPageProps {
  newBgImg: string;
  selections: OptionsMap;
  particles: Particle[];
  selectedGenre: Genre | null;
  isFusionReady: boolean;
  toggleOption: (category: string, optionId: string) => void;
}

const ConfiguratorPage: React.FC<ConfiguratorPageProps> = ({
  newBgImg,
  selections,
  particles,
  selectedGenre,
  isFusionReady,
  toggleOption
}) => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${newBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1
        }}
      />
      <div className="configurator-layout">
        {/* Las 4 esquinas del configurador (estanterías de ingredientes) */}
        <OptionsShelf 
          category="diseno" 
          title="Diseño Gráfico" 
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
          title="Mecánicas Extra" 
          cornerClass="corner-bl" 
          selections={selections} 
          toggleOption={toggleOption} 
        />
        <OptionsShelf 
          category="plataforma" 
          title="Banda Sonora" 
          cornerClass="corner-br" 
          selections={selections} 
          toggleOption={toggleOption} 
        />

        {/* El Dashboard Central: El Caldero Mágico */}
        <div className="center-dashboard">
          <ParticleEffect particles={particles} />
          <Cauldron selectedGenre={selectedGenre} isFusionReady={isFusionReady} />

          {/* Botón final de acción */}
          <button
            className="btn-fusionar"
            disabled={!isFusionReady}
            onClick={() => alert('¡Lanzando HECHIZO DE CREACIÓN!')}
          >
            ¡CONJURAR JUEGO!
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfiguratorPage;
