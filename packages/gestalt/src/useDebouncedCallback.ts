import { useEffect, useRef } from 'react';

/**
 * Hook to debounce a particular function from being called until after a given
 * wait period. An important bit is that we clear the timeout when the component
 * unmounts. That way, we avoid React state updates on unmounted components which
 * result in a warning. See https://stackoverflow.com/a/60907638/117193 for more info
 */
export default function useDebouncedCallback(callback: () => void, wait: number): () => void {
  const timeout = useRef<undefined | number>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => cleanup, []);

  return function debouncedCallback() {
    cleanup();

// @ts-expect-error - TS2322 - Type 'Timeout' is not assignable to type 'number'.
    timeout.current = setTimeout(() => {
      callback();
    }, wait);
  };
}
