import React from 'react';
import { Particle } from '../types';

interface ParticleEffectProps {
  particles: Particle[];
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ particles }) => {
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
