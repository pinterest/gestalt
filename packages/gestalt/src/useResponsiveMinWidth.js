// @flow strict
import { useCallback, useEffect, useMemo, useState } from 'react';
import { addListener, removeListener } from './utils/matchMedia.js';

type MinWidthType = 'lg' | 'md' | 'sm' | 'xs';

const breakpoints = {
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1312px)',
};

export default function useResponsiveMinWidth(): ?MinWidthType {
  const supportsMatchMedia = typeof window !== 'undefined' && window.matchMedia;

  const mediaQuery = useMemo(
    () =>
      supportsMatchMedia
        ? {
            lg: window.matchMedia(breakpoints.lg),
            md: window.matchMedia(breakpoints.md),
            sm: window.matchMedia(breakpoints.sm),
          }
        : undefined,
    [supportsMatchMedia],
  );

  const getMinWidth = useCallback(
    () =>
      supportsMatchMedia && mediaQuery
        ? (mediaQuery.lg.matches && 'lg') ||
          (mediaQuery.md.matches && 'md') ||
          (mediaQuery.sm.matches && 'sm') ||
          'xs'
        : undefined,
    [mediaQuery, supportsMatchMedia],
  );

  const [minWidth, setMinWidth] = useState(supportsMatchMedia ? getMinWidth() : undefined);

  useEffect(() => {
    if (!supportsMatchMedia) {
      return () => {};
    }

    const handleChange = () => {
      setMinWidth(getMinWidth());
    };

    handleChange();
    if (mediaQuery) {
      addListener(mediaQuery.lg, handleChange);
      addListener(mediaQuery.md, handleChange);
      addListener(mediaQuery.sm, handleChange);
    }

    return () => {
      if (mediaQuery) {
        removeListener(mediaQuery.lg, handleChange);
        removeListener(mediaQuery.md, handleChange);
        removeListener(mediaQuery.sm, handleChange);
      }
    };
  }, [getMinWidth, mediaQuery, supportsMatchMedia]);

  return minWidth;
}
