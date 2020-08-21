// @flow strict
import { useEffect, useRef } from 'react';

export default function usePrevious(
  value: string | number
): void | string | number {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
