/**
 * 📄 ARCHIVO: ParticleEffect.tsx
 * 📝 DESCRIPCIÓN: Componente para el efecto visual de partículas al añadir ingredientes.
 */

// ParticleEffect.tsx
// Renderiza las partículas que caen desde el caldero cuando el usuario selecciona opciones.
// Cada partícula usa variables CSS personalizadas para recibir posición y color.

import React from 'react';
import { Particle } from '../types';

// SECCIÓN: Definición de datos/propiedades
interface ParticleEffectProps {
  particles: Particle[];
}

// SECCIÓN: Componente o Función lógica
const ParticleEffect: React.FC<ParticleEffectProps> = ({ particles }) => {
// SECCIÓN: Renderizado visual
  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="falling-particle"
          style={{
            '--particle-color': particle.color,
            '--particle-x': `${particle.x}px`,
            '--particle-y': `${particle.y}px`
          } as React.CSSProperties & { '--particle-color': string; '--particle-x': string; '--particle-y': string }}
        />
      ))}
    </>
  );
};

export default ParticleEffect;
