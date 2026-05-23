/**
 * 📄 ARCHIVO: OptionsShelf.tsx
 * 📝 DESCRIPCIÓN: Estante interactivo que contiene los ingredientes seleccionables.
 */

// OptionsShelf.tsx
// Componente reutilizable que renderiza una cuadrícula de botones de selección
// para una categoría concreta de ingredientes.

import React from 'react';
import type { AttributeOption, ConfigCategory, OptionsMap } from '../types';

// SECCIÓN: Definición de datos/propiedades
interface OptionsShelfProps {
  category: ConfigCategory;
  title: string;
  cornerClass: string;
  selections: OptionsMap;
  options?: AttributeOption[];
  toggleOption: (category: ConfigCategory, optionId: string) => void;
}

const categoryOptions: Record<ConfigCategory, Array<{ id: string; label: string }>> = {
  diseno: [
    { id: 'diseno-forest', label: 'Comic' },
    { id: 'diseno-vintage', label: 'Sketch' },
    { id: 'diseno-illustrative', label: '3D' },
    { id: 'diseno-acuarela', label: 'Pixel Art' },
    { id: 'diseno-nocturno', label: 'Realist' },
    { id: 'diseno-cartoon', label: 'Anime' },
    { id: 'diseno-rustico', label: 'Voxel Art' },
    { id: 'diseno-elegante', label: 'Noir' },
    { id: 'diseno-minimal', label: 'Low Poly' }
  ],
  tematica: [
    { id: 'tematica-alquimia', label: 'Medieval' },
    { id: 'tematica-leyenda', label: 'Si-Fi' },
    { id: 'tematica-brujeria', label: 'Demons' },
    { id: 'tematica-elfico', label: 'Zombie' },
    { id: 'tematica-fantasia', label: 'Fantasy' },
    { id: 'tematica-cristales', label: 'Alien' },
    { id: 'tematica-lunar', label: 'Postapocalyptic' },
    { id: 'tematica-forestal', label: 'Cyberpunk' },
    { id: 'tematica-mistico', label: 'Superhero' }
  ],
  mecanicas: [
    { id: 'mecanicas-puzzle', label: 'Puzzle' },
    { id: 'mecanicas-aventura', label: 'Turn-Based' },
    { id: 'mecanicas-plataforma', label: 'Double Jump' },
    { id: 'mecanicas-ritmo', label: 'Stealth' },
    { id: 'mecanicas-exploracion', label: 'Skill Tree' },
    { id: 'mecanicas-combate', label: 'Combat' },
    { id: 'mecanicas-sigilo', label: 'Lives' },
    { id: 'mecanicas-simulacion', label: 'Crafting' },
    { id: 'mecanicas-estrategia', label: 'Resource Management' }
  ],
  sonido: [
    { id: 'sonido-misterioso', label: 'Mistery' },
    { id: 'sonido-coros', label: 'Orchestral' },
    { id: 'sonido-campanas', label: 'Bells' },
    { id: 'sonido-flauta', label: 'Calm' },
    { id: 'sonido-tambores', label: 'Synthwave' },
    { id: 'sonido-susurros', label: 'Rock/Metal' },
    { id: 'sonido-eco', label: 'Comercial' },
    { id: 'sonido-ambiente', label: 'Medieval' },
    { id: 'sonido-magico', label: 'Funk' }
  ]
};

const OptionsShelf: React.FC<OptionsShelfProps> = ({
  category,
  title,
  cornerClass,
  selections,
  options,
  toggleOption
}) => {
  // SECCIÓN: Componente o Función lógica
  const optionList = options?.length ? options : categoryOptions[category] || [];

  // SECCIÓN: Renderizado visual
  return (
    <div className={`config-corner ${cornerClass}`}>
      <h3>{title}</h3>
      <div className="options-grid">
        {optionList.map((opt) => (
          <button
            key={opt.id}
            className={`option-btn ${selections[category]?.includes(opt.id) ? 'selected' : ''}`}
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
