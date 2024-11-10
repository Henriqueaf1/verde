// src/components/NotificationPopup.js
import React, { useEffect } from 'react';
import './NotificationPopup.css';

function NotificationPopup({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Oculta a notificação após 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-popup ${type}`}>
      <p>{message}</p>
    </div>
  );
}

export default NotificationPopup;
