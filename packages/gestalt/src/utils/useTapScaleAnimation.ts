import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './tapScaleAnimation.css';

const shouldKeyPressTriggerTap = (event: React.KeyboardEvent): boolean =>
  ['Space', 'Enter'].includes(event.code);

export default function useTapScaleAnimation() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [animatingScaleDown, setAnimatingScaleDown] = useState(false);
  const [animatingScaleUp, setAnimatingScaleUp] = useState(false);
  const [isTapping, setTapping] = useState(false);

  const handleMouseDown = () => {
    if (isTapping) return;

    setTapping(true);
    setAnimatingScaleDown(true);
    setAnimatingScaleUp(false);
  };

  const handleMouseUp = () => {
    setTapping(false);

    if (!animatingScaleDown) setAnimatingScaleUp(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (shouldKeyPressTriggerTap(event)) handleMouseDown();
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (shouldKeyPressTriggerTap(event)) handleMouseUp();
  };

  useEffect(() => {
    const element = elementRef.current;

    const handleAnimationEnd = () => {
      setAnimatingScaleUp(!isTapping && animatingScaleDown);
      setAnimatingScaleDown(false);
    };

    element?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [animatingScaleDown, isTapping]);

  const classes = classnames({
    [styles.tapScaleDown]: isTapping || animatingScaleDown,
    [styles.tapScaleUp]: animatingScaleUp,
  });

  return {
    elementRef,
    classes,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
    handleKeyUp,
  };
}
