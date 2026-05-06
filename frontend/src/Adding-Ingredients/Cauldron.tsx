/**
 * 📄 ARCHIVO: Cauldron.tsx
 * 📝 DESCRIPCIÓN: Archivo del proyecto.
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
// SECCIÓN: Renderizado visual
  return (
    <div className="center-dashboard-content">
      <div>
        <h2>Añadir Ingredientes al Caldero</h2>
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
