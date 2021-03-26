import { useEffect, useRef } from 'react';

/**
 * HTML Element Click Hook
 * @param func handler function
 * @returns HTMLElement ref
 */
export default function useClick<T extends HTMLElement>(func: () => void) {
  const ref = useRef<T>(null);
  const refDOM = ref.current;

  useEffect(() => {
    if (refDOM) {
      refDOM.addEventListener('click', func);
    }

    return () => {
      if (refDOM) {
        refDOM.removeEventListener('click', func);
      }
    };
  }, [func, refDOM]);

  return ref;
}
