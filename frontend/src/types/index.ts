// types/index.ts
// Tipos compartidos que se usan en toda la aplicación.
// Definen las opciones de navegación, la estructura de los géneros,
// los datos de selección y el modelo de partículas para los efectos visuales.

export type Step = 'select-pot' | 'configurator';
export type ConfigCategory = 'diseno' | 'tematica' | 'mecanicas' | 'sonido';
export interface AttributeOption {
  id: string;
  label: string;
  categoria?: ConfigCategory;
}
export type AttributeOptionsMap = Record<ConfigCategory, AttributeOption[]>;
export type OptionsMap = Record<ConfigCategory, string[]>;
export type Page = 'home' | 'creator' | 'my-cauldrons' | 'intranet' | 'login' | 'conocenos';

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
