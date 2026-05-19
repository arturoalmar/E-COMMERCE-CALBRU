import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './DemoLoadingScreen.css';

const messages = [
  '🔮 Mixing magical ingredients...',
  '✨ Invoking the code spell...',
  '🧙 The witch is weaving your world...',
  '🌙 Forging the demo in the cauldron...',
  '⚗️ Distilling the essence of your game...',
];

const DemoLoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return createPortal(
    <div className="demo-loading-overlay">
      <div className="demo-loading-content">

        <div className="demo-loading-cauldron">🪄</div>

        <div className="demo-loading-orbs">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
          <span className="orb orb-4" />
          <span className="orb orb-5" />
        </div>

        <h2 className="demo-loading-title">Creating your Magical Demo</h2>
        <p className="demo-loading-message">{messages[messageIndex]}</p>

        <div className="demo-loading-bar">
          <div className="demo-loading-bar-fill" />
        </div>

      </div>
    </div>,
    document.body
  );
};

export default DemoLoadingScreen;