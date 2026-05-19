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
    name: 'Cards',
    description: 'Build your perfect deck, create synergies and defeat your rivals with pure strategy.',
    image: cardsCauldron,
    hue: 0
  },
  {
    id: 'platformer',
    name: 'Platformer',
    description: 'Precise jumps, challenging levels and vibrant worlds full of secrets.',
    image: jumpCauldron,
    hue: 200
  },
  {
    id: 'party',
    name: 'Party',
    description: 'Frenetic mini-games, traitorous friends and lots of local multiplayer fun.',
    image: partyCauldron,
    hue: 60
  },
  {
    id: 'survivor',
    name: 'Autoshooter',
    description: 'Unending hordes, auto-upgrades and chaos on screen until the last second.',
    image: survivorCauldron,
    hue: 280
  },
];

export const RANDOM_COLORS = ['#ab47bc', '#ffb300', '#00bcd4', '#ff5555'];
