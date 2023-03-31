// @flow strict
import { useEffect } from 'react';
import { useAnimation } from '../animation/AnimationContext.js';
import { ESCAPE } from '../keyCodes.js';

const useContentContainer = ({ onDirectDismiss }: {| onDirectDismiss?: () => void |}) => {
  const { onExternalDismiss } = useAnimation();

  useEffect(() => {
    function handleKeyDown(event: {| keyCode: number |}) {
      if (event.keyCode === ESCAPE) {
        (onDirectDismiss ?? onExternalDismiss)();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    // When SheetMobile is full page displayed in mobile browser, the body scroll is still accessible. Here we disable to just allow the scrolling within Modal
    if (window && window.body?.style?.overflow) {
      window.body.style.overflow = 'hidden';
    }
    return () => {
      if (window && window.body?.style?.overflow) {
        window.body.style.overflow = 'auto';
      }
    };
  }, []);
};

export default useContentContainer;
