import { useEffect, useRef } from 'react';

/**
 * FadeIn 효과를 제공하는 Hook
 * @param duration Animation Duration
 * @param delay Animation Delay
 * @returns props Object
 */
export default function useFadeIn<T extends HTMLElement>(duration: number = 1, delay: number = 0) {
  const element = useRef<T>(null);

  useEffect(() => {
    if (element.current) {
      element.current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      element.current.style.opacity = '1';
    }
  }, [duration, delay]);

  return {
    ref: element,
    style: {
      opacity: 0,
    },
  };
}
