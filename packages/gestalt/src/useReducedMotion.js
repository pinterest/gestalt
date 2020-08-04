// @flow strict
import { useState, useEffect } from 'react';

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
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [supportsMatchMedia]);
  return matches;
}
