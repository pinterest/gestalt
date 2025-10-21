import { useEffect, useState } from 'react';

const BANNER_TEXT_MAX_WIDTH = 545;
const BANNER_TEXT_MD_MAX_WIDTH = 450;

const SM_BREAKPOINT_PX = 576;
const MD_BREAKPOINT_PX = 768;
const LG_BREAKPOINT_PX = 992;

export const SM_BREAKPOINT = 'sm';
export const MD_BREAKPOINT = 'md';
export const LG_BREAKPOINT = 'lg';

const useBannerResize = (): { maxWidth: number | string; breakpoint: string } => {
  const [maxWidth, setMaxWidth] = useState<number | string>(BANNER_TEXT_MAX_WIDTH);
  const [breakpoint, setBreakpoint] = useState<string>(LG_BREAKPOINT);

  useEffect(() => {
    const compute = () => {
      if (typeof window === 'undefined') return;

      const containerWidth = window.innerWidth;

      if (containerWidth >= LG_BREAKPOINT_PX) {
        setMaxWidth(BANNER_TEXT_MAX_WIDTH);
      } else if (containerWidth >= MD_BREAKPOINT_PX) {
        setMaxWidth(BANNER_TEXT_MD_MAX_WIDTH);
      } else if (containerWidth > SM_BREAKPOINT_PX) {
        setMaxWidth(450);
      } else {
        setMaxWidth('100%');
      }

      if (containerWidth <= SM_BREAKPOINT_PX) {
        setBreakpoint(SM_BREAKPOINT);
      } else if (containerWidth <= MD_BREAKPOINT_PX) {
        setBreakpoint(MD_BREAKPOINT);
      } else {
        setBreakpoint(LG_BREAKPOINT);
      }
    };

    // Initial evaluation
    compute();

    // Respond to viewport resizes
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', compute);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', compute);
      }
    };
  }, []);

  return { maxWidth, breakpoint };
};

export default useBannerResize;
