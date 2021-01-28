// @flow strict
import { useState, useEffect } from 'react';
import { addListener, removeListener } from './utils/matchMedia.js';

export default function useReducedMotion(): boolean {
  const supportsMatchMedia = typeof window !== 'undefined' && window.matchMedia;

  const [matches, setMatch] = useState(
    supportsMatchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
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
