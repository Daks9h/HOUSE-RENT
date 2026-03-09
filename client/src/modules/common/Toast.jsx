import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  // useEffect ka use karke hum auto-hide feature add karenge
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 3 seconds baad toast band ho jayega
    }, duration);

    return () => clearTimeout(timer); // Cleanup function taaki memory leak na ho
  }, [onClose, duration]);

  // Type ke basis par icon decide karte hain
  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`toast-wrapper ${type}`}>
      <span className="toast-icon">{getIcon()}</span>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
