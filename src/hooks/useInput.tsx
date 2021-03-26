import React, { useCallback, useState } from 'react';

type ReturnType<T> = [T, (event: FieldEvent<T>) => void, React.Dispatch<React.SetStateAction<T>>];

type FieldEvent<T> = React.ChangeEvent<
  { value: T; name?: string } & (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
>;

/**
 * Custom Input Hook
 * @param initialValue 기본값
 * @param validator 검증 함수
 * @returns Array
 */
export default function useInput<T>(
  initialValue: T,
  validator?: (value: T) => boolean
): ReturnType<T> {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: FieldEvent<T>) => {
      let currentValue = event.target.value;

      // 검증 함수 존재 시 입력 값 검증하기
      if (validator && typeof validator === 'function' && !validator(currentValue)) {
        console.log('유효하지 않은 값!!!');
        return;
      }

      setValue(currentValue);
    },
    [validator]
  );

  return [value, onChange, setValue];
}
