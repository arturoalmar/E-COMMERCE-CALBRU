/**
 * 📄 ARCHIVO: Cauldron.tsx
 * 📝 DESCRIPCIÓN: Componente principal que representa el caldero mágico y su lógica.
 *
 * CAMBIOS:
 * - El div raíz ahora usa className "center-dashboard-content" en lugar de
 *   "center-dashboard-content {readyClass}".
 *   La clase "cauldron-ready" se aplica al wrapper para que el CSS selector
 *   ".cauldron-ready .cauldron-image" siga funcionando.
 * - La imagen usa position: absolute con bottom: 0 (definido en CSS)
 *   para quedar anclada visualmente sobre el fuego del fondo.
 */

import React from 'react';
import { Genre } from '../types';

interface CauldronProps {
  selectedGenre: Genre | null;
  isFusionReady: boolean;
}

const Cauldron: React.FC<CauldronProps> = ({ selectedGenre, isFusionReady }) => {
  const readyClass = isFusionReady ? 'cauldron-ready' : '';

  return (
    /* center-dashboard-content: wrapper de altura fija (300px en CSS).
       La imagen del caldero se ancla con bottom: 0 para coincidir
       visualmente con la zona de fuego del fondo. */
    <div className={`center-dashboard-content ${readyClass}`}>

      {selectedGenre ? (
        <img
          src={selectedGenre.image}
          alt={`${selectedGenre.name} caldero`}
          className="cauldron-image"
        />
      ) : (
        <div className="cauldron-placeholder">
          Select a game base to activate the cauldron.
        </div>
      )}

    </div>
  );
};

export default Cauldron;