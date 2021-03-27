import { useCallback, useEffect } from 'react';

/**
 * 마우스가 화면 밖을 나갈 때 처리해주는 Hook
 * @param onBefore Callback Function
 */
export default function useBeforeLeave(onBefore: () => void) {
  const handler = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0) {
        onBefore();
      }
    },
    [onBefore]
  );
  useEffect(() => {
    document.addEventListener('mouseleave', handler);

    return () => {
      document.removeEventListener('mouseleave', handler);
    };
  }, [handler]);
}
