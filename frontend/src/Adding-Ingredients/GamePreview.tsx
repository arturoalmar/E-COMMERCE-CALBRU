import { ConfigCategory, OptionsMap } from '../types';

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

export function resolveLabels(selections: OptionsMap): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const category of Object.keys(selections) as ConfigCategory[]) {
    const selectedIds = selections[category];
    const options = categoryOptions[category];
    result[category] = selectedIds
      .map(id => options.find(o => o.id === id)?.label)
      .filter(Boolean) as string[];
  }
  return result;
}