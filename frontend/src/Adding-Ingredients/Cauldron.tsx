/**
 * 📄 ARCHIVO: Cauldron.tsx
 * 📝 DESCRIPCIÓN: Componente principal que representa el caldero mágico y su lógica.
 */

// Cauldron.tsx
// Componente central del configurador. Muestra el caldero, la base de juego seleccionada
// y el estado de si el conjuro está listo para disparar.

import React from 'react';
import { Genre } from '../types';

// SECCIÓN: Definición de datos/propiedades
interface CauldronProps {
  selectedGenre: Genre | null;
  isFusionReady: boolean;
}

// SECCIÓN: Componente o Función lógica
const Cauldron: React.FC<CauldronProps> = ({ selectedGenre, isFusionReady }) => {
  const readyClass = isFusionReady ? 'cauldron-ready' : '';
// SECCIÓN: Renderizado visual
  return (
    <div className={`center-dashboard-content ${readyClass}`}>



      {selectedGenre ? (
        <img
          src={selectedGenre.image}
          alt={`${selectedGenre.name} caldero`}
          className="cauldron-image"
        />
      ) : (
        <div className="cauldron-placeholder">
          Selecciona una base de juego para activar el caldero.
        </div>
      )}
    </div>
  );
};

export default Cauldron;
