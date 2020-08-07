// @flow strict
import { useState, useEffect } from 'react';

function addListener(mediaQuery, callback) {
  // addEventListener on mediaQuery is not supported in all browsers (Edge / Safari)
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', callback);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(callback);
  }
}
function removeListener(mediaQuery, callback) {
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', callback);
  } else if (mediaQuery.removeListener) {
    mediaQuery.removeListener(callback);
  }
}

export default function useReducedMotion(): boolean {
  const supportsMatchMedia = typeof window !== 'undefined' && window.matchMedia;

  const [matches, setMatch] = useState(
    supportsMatchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    if (!supportsMatchMedia) {
      return () => {};
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setMatch(mediaQuery.matches);
    };
    handleChange();
    addListener(mediaQuery, handleChange);
    return () => {
      removeListener(mediaQuery, handleChange);
    };
  }, [supportsMatchMedia]);
  return matches;
}
