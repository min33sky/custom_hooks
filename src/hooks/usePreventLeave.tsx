export default function usePreventLeave() {
  const listener = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    // ? Chrome에 필요한 설정
    event.returnValue = '';
  };

  const enablePrevent = () => window.addEventListener('beforeunload', listener);

  const disablePrevent = () => window.removeEventListener('beforeunload', listener);

  return { enablePrevent, disablePrevent };
}
