// @flow strict
import { useEffect, useRef } from 'react';

export default function useDebouncedCallback(
  callback: () => void,
  wait: number
) {
  const timeout = useRef();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => cleanup, []);

  return function debouncedCallback() {
    cleanup();

    timeout.current = setTimeout(() => {
      callback();
    }, wait);
  };
}
