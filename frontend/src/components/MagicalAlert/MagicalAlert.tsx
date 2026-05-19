import React from 'react';
import './MagicalAlert.css';

interface MagicalAlertProps {
  isOpen: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'confirm';
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const MagicalAlert: React.FC<MagicalAlertProps> = ({ 
  isOpen, 
  message, 
  type = 'success', 
  onConfirm, 
  onCancel,
  confirmText = 'Accept',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div className="magical-alert-overlay">
      <div className={`magical-alert-box ${type}`}>
        <div className="magical-alert-content">
          <div className="magical-alert-icon">
            {type === 'success' && '✨'}
            {type === 'error' && '🔥'}
            {type === 'warning' && '📜'}
            {type === 'confirm' && '🔮'}
          </div>
          <p className="magical-alert-message">{message}</p>
        </div>
        <div className="magical-alert-actions">
          {type === 'confirm' && onCancel && (
            <button className="btn-alert-cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="btn-alert-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagicalAlert;
