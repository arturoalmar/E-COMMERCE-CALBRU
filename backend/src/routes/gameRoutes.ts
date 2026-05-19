/**
 * 📄 ARCHIVO: gameRoutes.ts
 * 📝 DESCRIPCIÓN: Ruta para generar una demo jugable con IA (Gemini).
 */

import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

router.post('/generate', async (req: Request, res: Response) => {
  const { genre, diseno, tematica, mecanicas, sonido } = req.body;

  if (!genre) {
    return res.status(400).json({ message: 'El género es obligatorio' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const prompt = `
      Eres un generador de videojuegos en HTML5 + JavaScript puro.

      Genera UN ARCHIVO HTML COMPLETO y autocontenido que sea un minijuego
      jugable de 1 nivel con estas características:

      - Género: ${genre}
      - Estilo visual (diseño): ${Array.isArray(diseno) && diseno.length ? diseno.join(', ') : 'libre'}
      - Temática: ${Array.isArray(tematica) && tematica.length ? tematica.join(', ') : 'libre'}
      - Mecánicas de juego: ${Array.isArray(mecanicas) && mecanicas.length ? mecanicas.join(', ') : 'libre'}
      - Ambiente sonoro (descríbelo visualmente ya que no puedes poner audio): ${Array.isArray(sonido) && sonido.length ? sonido.join(', ') : 'libre'}

      Requisitos técnicos obligatorios:
      - Todo el código en un solo archivo HTML (CSS y JS embebidos)
      - Usar canvas HTML5 para el renderizado
      - Controles: teclado (flechas o WASD)
      - El juego debe ser completable en menos de 2 minutos
      - Incluir un mensaje de victoria al completar el nivel
      - NO usar librerías externas (ni CDN, ni imports)

      Devuelve ÚNICAMENTE el código HTML, sin explicaciones, sin bloques markdown.
      Empieza directamente con <!DOCTYPE html>
    `;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const html = raw
      .replace(/^```html\n?/, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    if (!html.includes('<!DOCTYPE html')) {
      return res.status(500).json({ message: 'La IA no generó HTML válido. Inténtalo de nuevo.' });
    }

    res.json({ html });

  } catch (error) {
    console.error('Error al generar el juego con Gemini:', error);
    res.status(500).json({ message: 'Error al conectar con la IA. Inténtalo de nuevo.' });
  }
});

export default router;