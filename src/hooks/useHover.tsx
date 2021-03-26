import { useEffect, useRef } from 'react';

export default function useHover<T extends HTMLElement>(func: () => void) {
  const ref = useRef<T>(null);
  const refDOM = ref.current;

  useEffect(() => {
    if (refDOM) {
      refDOM.addEventListener('mouseenter', func);
    }
    return () => {
      if (refDOM) {
        refDOM.removeEventListener('mouseenter', func);
      }
    };
  }, [func, refDOM]);

  return ref;
}
