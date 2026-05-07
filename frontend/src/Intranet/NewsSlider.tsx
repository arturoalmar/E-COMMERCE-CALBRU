/**
 * 📄 ARCHIVO: NewsSlider.tsx
 * 📝 DESCRIPCIÓN: Carrusel de noticias destacadas para la Intranet.
 */

// NewsSlider.tsx
// Componente de carrusel de noticias para el área de intranet.
// Avanza automáticamente o manualmente entre items informativos.

import React, { useState, useEffect, useCallback } from 'react';

export interface NewsItem {
  id: number;
  title: string;
  img: string;
  desc: string;
}

// SECCIÓN: Definición de datos/propiedades
interface NewsSliderProps {
  newsItems: NewsItem[];
}

// SECCIÓN: Componente o Función lógica
const NewsSlider: React.FC<NewsSliderProps> = ({ newsItems }) => {
  const [currentNews, setCurrentNews] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);

  useEffect(() => {
    const intervalTime = isManualPaused ? 10000 : 6000;
// SECCIÓN: Componente o Función lógica
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
      if (isManualPaused) setIsManualPaused(false);
    }, intervalTime);
// SECCIÓN: Renderizado visual
    return () => clearInterval(timer);
  }, [newsItems.length, isManualPaused]);

// SECCIÓN: Componente o Función lógica
  const handleManualNav = useCallback((next: boolean) => {
    setIsManualPaused(true);
    setCurrentNews(prev => (next ? (prev + 1) % newsItems.length : (prev === 0 ? newsItems.length - 1 : prev - 1)));
  }, [newsItems.length]);

// SECCIÓN: Renderizado visual
  return (
    <section className="news-slider-dynamic">
      <button className="slider-btn prev" onClick={() => handleManualNav(false)}>❮</button>
      <div className="slider-wrapper">
        <div className="slider-track" style={{ transform: `translateX(-${currentNews * 100}%)` }}>
          {newsItems.map((item) => (
            <div className="news-slide" key={item.id}>
              <div className="news-image-container">
                <img src={item.img} alt={item.title} />
                <div className="news-overlay-gradient">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="slider-btn next" onClick={() => handleManualNav(true)}>❯</button>
    </section>
  );
};

export default NewsSlider;
