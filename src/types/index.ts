export type Step = 'select-pot' | 'configurator';
export type OptionsMap = Record<string, string[]>;
export type Page = 'home' | 'creator';

export interface Genre {
  id: string;
  name: string;
  description: string;
  image: string;
  hue: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}
