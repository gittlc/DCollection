import { useEffect } from 'react';
import { StatusBar } from '@capacitor/status-bar';

const StatusBarManager = () => {
  useEffect(() => {
    StatusBar.setStyle({ style: 'DEFAULT' });

    let timeout;

    const handleTouchStart = () => {
      clearTimeout(timeout);
    };

    const handleTouchEnd = () => {
      timeout = setTimeout(() => {
        StatusBar.hide();
      }, 3000);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return null;
};

export default StatusBarManager;
