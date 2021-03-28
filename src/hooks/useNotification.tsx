/**
 * Notification Hook
 * @param message 알림 메세지
 * @param options 알림 옵션
 * @returns handler
 */
export default function useNotification(message: string, options: NotificationOptions) {
  if (!('Notification' in window)) {
    return;
  }

  const fireNotIf = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(message, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(message, options);
    }
  };

  return fireNotIf;
}
