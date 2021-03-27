import { useCallback, useEffect, useState } from 'react';

/**
 * Network Status Hook
 * @param onNetwork Callback
 * @returns Network Status
 */
export default function useNetwork(onNetwork: (networkStatus: boolean) => void) {
  const [status, setStatus] = useState(navigator.onLine);

  const handler = useCallback(() => {
    onNetwork(navigator.onLine);
    setStatus(navigator.onLine);
  }, [onNetwork]);

  useEffect(() => {
    window.addEventListener('online', handler);
    window.addEventListener('offline', handler);

    return () => {
      window.removeEventListener('online', handler);
      window.removeEventListener('offline', handler);
    };
  }, [handler]);

  return status;
}
