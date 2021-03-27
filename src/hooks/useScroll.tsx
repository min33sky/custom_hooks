import { useEffect, useState } from 'react';

/**
 * Scroll Hook
 * @returns scroll offset
 */
export default function useScroll() {
  const [offset, setOffset] = useState({ xPos: 0, yPos: 0 });

  const handler = () => {
    setOffset({
      xPos: window.scrollX,
      yPos: window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return offset;
}
