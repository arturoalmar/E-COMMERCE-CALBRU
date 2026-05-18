import path from 'path';

interface DatosCaldero {
  id_caldero?: number;
  tipoJuego: string;       // Ej: "Arcade", "RPG", "Plataformas", etc.
  ingredientes?: string[]; // Ej: ["Retro", "Difícil"]
  config_ia?: string;      // Prompt del usuario
}

/**
 * 🎮 SIMULADOR DE IA (100% Gratis, estable y seguro para la presentación)
 * Hace esperar al usuario 3 segundos para emular que la IA está "cociendo" el juego
 * y luego asigna y devuelve el archivo de demostración correcto.
 */
export async function cocinarDemoSimulada(datos: DatosCaldero): Promise<string> {
  const { tipoJuego } = datos;

  console.log(`[IA SIMULADA] Empezando a cocinar juego de tipo: "${tipoJuego}"...`);

  // Hacemos un "sleep" de 3 segundos para simular el tiempo de forjado/compilación de la IA
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const tipo = tipoJuego ? tipoJuego.toLowerCase() : '';

  // Mapeamos los géneros a los archivos de juego correspondientes
  if (tipo.includes('supervivencia') || tipo.includes('acción') || tipo.includes('shooter')) {
    console.log('[IA SIMULADA] Juego asignado: juego_supervivencia.html');
    return '/public/demos/juego_supervivencia.html';
  } else if (tipo.includes('cartas')) {
    console.log('[IA SIMULADA] Juego asignado: juego_cartas.html');
    return '/public/demos/juego_cartas.html';
  } else if (tipo.includes('tablero') || tipo.includes('party') || tipo.includes('misterio')) {
    console.log('[IA SIMULADA] Juego asignado: juego_tablero.html');
    return '/public/demos/juego_tablero.html';
  } else if (tipo.includes('plataformas') || tipo.includes('salto') || tipo.includes('arcade')) {
    console.log('[IA SIMULADA] Juego asignado: juego_plataformas.html');
    return '/public/demos/juego_plataformas.html';
  } else {
    // Si eligen RPG, Aventura, u otra cosa por defecto
    console.log('[IA SIMULADA] Juego asignado: juego_rpg.html');
    return '/public/demos/juego_rpg.html';
  }
}

/**
 * Mantenemos la firma anterior para no romper la compatibilidad con las rutas de creación
 * pero redirigimos la lógica al motor de simulación 100% gratuito.
 */
export async function cocinarDemoConAntigravityClaude(datos: DatosCaldero): Promise<string> {
  return cocinarDemoSimulada(datos);
}
