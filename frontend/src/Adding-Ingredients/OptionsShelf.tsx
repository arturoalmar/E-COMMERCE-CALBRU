/**
 * 📄 ARCHIVO: OptionsShelf.tsx
 * 📝 DESCRIPCIÓN: Archivo del proyecto.
 */

// OptionsShelf.tsx
// Componente reutilizable que renderiza una cuadrícula de botones de selección
// para una categoría concreta de ingredientes.

import React from 'react';
import { OptionsMap } from '../types';

// SECCIÓN: Definición de datos/propiedades
interface OptionsShelfProps {
  category: string;
  title: string;
  cornerClass: string;
  selections: OptionsMap;
  toggleOption: (category: string, optionId: string) => void;
}

const OptionsShelf: React.FC<OptionsShelfProps> = ({ 
  category, 
  title, 
  cornerClass, 
  selections, 
  toggleOption 
}) => {
// SECCIÓN: Componente o Función lógica
  const options = Array.from({ length: 12 }).map((_, i) => ({
    id: `${category}-${i + 1}`,
    label: `Opción ${i + 1}`
  }));

// SECCIÓN: Renderizado visual
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

export default OptionsShelf;
