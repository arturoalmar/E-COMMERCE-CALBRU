/**
 * 📄 ARCHIVO: QuickLinks.tsx
 * 📝 DESCRIPCIÓN: Enlaces rápidos para la navegación de la Intranet.
 */

// QuickLinks.tsx
// Lista de acciones rápidas de la intranet que permite navegar entre vistas de RRHH.

import React from 'react';

// SECCIÓN: Definición de datos/propiedades
interface QuickLinksProps {
  setView: (view: 'main' | 'rules' | 'teleworking' | 'committee') => void;
}

// SECCIÓN: Componente o Función lógica
const QuickLinks: React.FC<QuickLinksProps> = ({ setView }) => {
// SECCIÓN: Renderizado visual
  return (
    <section className="quick-links-sketch">
      <h2 className="section-title-witch">Gestión Corporativa</h2>
      <ul className="interactive-links">
        <li>
          <a className="intranet-action-link" href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430" target="_blank" rel="noreferrer">- Estatuto de los Trabajadores</a>
          <p className="link-description">Marco legal de derechos y deberes.</p>
        </li>
        <li>
          <a className="intranet-action-link" href="https://www.confemetal.es/que-hacemos/negociacion-colectiva/convenios-provinciales/" target="_blank" rel="noreferrer">- Convenio del Metal</a>
          <p className="link-description">Normativa específica del sector.</p>
        </li>
        <li>
          <button className="intranet-action-link" onClick={() => setView('rules')}>- Normas y Código de Conducta</button>
          <p className="link-description">Guía de comportamiento y protocolos.</p>
        </li>
        <li>
          <button className="intranet-action-link" onClick={() => setView('teleworking')}>- Política de Teletrabajo</button>
          <p className="link-description">Condiciones para trabajo remoto.</p>
        </li>
        <li>
          <button className="intranet-action-link" onClick={() => setView('committee')}>- Comité de Empresa</button>
          <p className="link-description">Representación y derechos de los trabajadores.</p>
        </li>
      </ul>
    </section>
  );
};

export default QuickLinks;
