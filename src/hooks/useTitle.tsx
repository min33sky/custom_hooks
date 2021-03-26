import { useEffect, useState } from 'react';

/**
 * HTML Title Change Hook
 * @param initialTitle Initial Html Title
 * @returns title change Handler
 */
export default function useTitle(initialTitle: string) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
      htmlTitle.innerText = title;
    }
  }, [title]);

  return setTitle;
}
