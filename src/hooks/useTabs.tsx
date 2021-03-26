import { useState } from 'react';

/**
 * 주어진 인덱스값에 일치하는 아이템 반환하는 Hook
 * @param initialIndex 인덱스
 * @param allTabs 데이터 배열
 * @returns Object
 */
export default function useTabs<T>(initialIndex: number, allTabs: T[]) {
  const [index, setIndex] = useState(initialIndex);

  return {
    currentItem: allTabs[index],
    changeItem: setIndex,
  };
}
