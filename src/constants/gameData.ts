// constants/gameData.ts
// Datos estáticos que definen los distintos géneros de juego disponibles,
// sus descripciones, imágenes y el sistema de color para los efectos del juego.

import { Genre } from '../types';

import cardsCauldron from '../assets/cards_cauldron.png';
import jumpCauldron from '../assets/jump__cauldron.png';
import partyCauldron from '../assets/party_cauldron.png';
import survivorCauldron from '../assets/survivor_cauldron.png';

export const GENRES: Genre[] = [
  {
    id: 'cards',
    name: 'Juego de Cartas',
    description: 'Construye tu mazo perfecto, crea sinergias y derrota a tus rivales con estrategia pura.',
    image: cardsCauldron,
    hue: 0
  },
  {
    id: 'platformer',
    name: 'Plataformas',
    description: 'Saltos precisos, niveles desafiantes y mundos vibrantes llenos de secretos.',
    image: jumpCauldron,
    hue: 200
  },
  {
    id: 'party',
    name: 'Estilo Mario Party',
    description: 'Minijuegos frenéticos, amigos traicioneros y mucha diversión multijugador local.',
    image: partyCauldron,
    hue: 60
  },
  {
    id: 'survivor',
    name: 'Estilo Vampire Survivor',
    description: 'Hordas interminables, mejoras auto-disparadas y caos en pantalla hasta el último segundo.',
    image: survivorCauldron,
    hue: 280
  },
];

export const RANDOM_COLORS = ['#ab47bc', '#ffb300', '#00bcd4', '#ff5555'];
