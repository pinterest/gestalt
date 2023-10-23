// @flow strict
import { useEffect, useState } from 'react';
import { ENTER, SPACE } from './keyCodes.js';

const SCROLL_DISTANCE = 10;

type Coordinate = {
  +x: number,
  +y: number,
};

type TapTargetHTMLElement = HTMLDivElement;

export const keyPressShouldTriggerTap = (
  event: SyntheticKeyboardEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
): boolean => [ENTER, SPACE].includes(event.charCode);

export default function useTapFeedback({ height, width }: { height: ?number, width: ?number }): {
  compressStyle: ?{ transform: string },
  handleBlur: () => void,
  handleMouseDown: () => void,
  handleMouseUp: () => void,
  handleTouchCancel: () => void,
  handleTouchEnd: () => void,
  handleTouchMove: (SyntheticTouchEvent<TapTargetHTMLElement>) => void,
  handleTouchStart: (SyntheticTouchEvent<TapTargetHTMLElement>) => void,
  isTapping: boolean,
} {
  const [isTapping, setTapping] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<Coordinate>({
    x: 0,
    y: 0,
  });

  const [compressStyle, setCompressStyle] = useState<null | {
    transform: string,
  }>(null);

  useEffect(() => {
    if (height != null && width != null) {
      const largestSize = width > height ? width : height;
      setCompressStyle({
        transform: isTapping ? `scale(${(largestSize - 4) / largestSize})` : '',
      });
    }
  }, [height, width, isTapping]);

  return {
    compressStyle,
    isTapping,
    handleBlur: () => setTapping(false),
    handleMouseDown: () => setTapping(true),
    handleMouseUp: () => setTapping(false),
    handleTouchStart: ({ touches }: SyntheticTouchEvent<TapTargetHTMLElement>) => {
      setTapping(true);
      const [touch] = touches;
      if (touch) {
        setCoordinate({
          x: touch.clientX,
          y: touch.clientY,
        });
      }
    },
    handleTouchMove: ({ touches }: SyntheticTouchEvent<TapTargetHTMLElement>) => {
      const [touch] = touches;
      if (isTapping && touch) {
        const { x: startX, y: startY } = coordinate;
        const { clientX, clientY } = touch;
        if (
          Math.abs(clientX - startX) > SCROLL_DISTANCE ||
          Math.abs(clientY - startY) > SCROLL_DISTANCE
        ) {
          setTapping(false);
        }
      }
    },
    handleTouchCancel: () => setTapping(false),
    handleTouchEnd: () => setTapping(false),
  };
}
