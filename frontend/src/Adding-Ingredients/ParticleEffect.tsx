/**
 * 📄 ARCHIVO: ParticleEffect.tsx
 * 📝 DESCRIPCIÓN: Componente para el efecto visual de partículas al añadir ingredientes.
 *
 * - position: fixed → las partículas se posicionan relativas al viewport, no al DOM
 * - top: -30px (en CSS) → arrancan fuera de pantalla por arriba
 * - z-index: 30 (en CSS) → por debajo del caldero (z-index: 60) para que
 *   el caldero las "trague" visualmente al llegar a él
 * - --drift-x: deriva horizontal aleatoria para trayectoria más orgánica
 */

import React from 'react';
import { Particle } from '../types';

interface ParticleEffectProps {
  particles: Particle[];
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ particles }) => {
  return (
    <>
      {particles.map((particle) => {
        // Deriva horizontal aleatoria entre -30px y +30px
        const driftX = Math.round((Math.random() - 0.5) * 60);

        return (
          <div
            key={particle.id}
            className="falling-particle"
            style={{
              '--particle-color': particle.color,
              '--particle-x': `${particle.x}px`,
              '--particle-y': `${particle.y}px`,
              '--drift-x': `${driftX}px`,
            } as React.CSSProperties & {
              '--particle-color': string;
              '--particle-x': string;
              '--particle-y': string;
              '--drift-x': string;
            }}
          />
        );
      })}
    </>
  );
};

export default ParticleEffect;