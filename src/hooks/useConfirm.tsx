/**
 * Confirm Hook
 * @param message 다이얼로그 메세지
 * @param onConfirm confirm Handler
 * @param onCancel cancel Handler
 * @returns dialog Function
 */
export default function useConfirm(message: string, onConfirm: () => void, onCancel: () => void) {
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
}
