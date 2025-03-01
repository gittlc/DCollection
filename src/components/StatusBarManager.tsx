import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

const StatusBarManager = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Capacitor.isPluginAvailable("StatusBar")) {
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    }

    const handleStart = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleEnd = () => {
      timeoutRef.current = setTimeout(() => {
        if (Capacitor.isPluginAvailable("StatusBar")) {
          StatusBar.hide().catch(() => {});
        }
      }, 3000);
    };

    window.addEventListener("touchstart", handleStart);
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("mousedown", handleStart);
    window.addEventListener("mouseup", handleEnd);

    return () => {
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mouseup", handleEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default StatusBarManager;
