import { useRef, useState } from 'react';

/**
 * Fullscreen Hook
 * @param callback Callback Function
 * @returns Object
 */
export default function useFullscreen<T extends HTMLElement>(callback: (isFull: boolean) => void) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const elementRef = useRef<T>(null);

  const triggerFull = () => {
    if (elementRef.current) {
      elementRef.current.requestFullscreen();
      setIsFullScreen(true);
      callback(true);
    }
  };

  const exitFull = () => {
    if (elementRef.current && isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
      callback(false);
    }
  };

  return { elementRef, triggerFull, exitFull };
}
