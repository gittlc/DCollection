import { useEffect, useRef } from "react";
import { StatusBar, Style } from "@capacitor/status-bar"; // Import Style

const StatusBarManager = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});

    const handleTouchStart = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleTouchEnd = () => {
      timeoutRef.current = setTimeout(() => {
        StatusBar.hide().catch(() => {});
      }, 3000);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default StatusBarManager;
