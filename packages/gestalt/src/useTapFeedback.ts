import { useEffect, useState } from 'react';
import { ENTER, SPACE } from './keyCodes';

const SCROLL_DISTANCE = 10;

type Coordinate = {
  readonly x: number;
  readonly y: number;
};

type TapTargetHTMLElement = HTMLDivElement | HTMLAnchorElement;

export const keyPressShouldTriggerTap = (
  event: React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLAnchorElement>,
): boolean => [ENTER, SPACE].includes(event.charCode);

export default function useTapFeedback({
  height,
  width,
}: {
  height: number | null | undefined;
  width: number | null | undefined;
}): {
  compressStyle:
    | {
        transform: string;
      }
    | null
    | undefined;
  handleBlur: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleTouchCancel: () => void;
  handleTouchEnd: () => void;
  handleTouchMove: (arg1: React.TouchEvent<TapTargetHTMLElement>) => void;
  handleTouchStart: (arg1: React.TouchEvent<TapTargetHTMLElement>) => void;
  isTapping: boolean;
} {
  const [isTapping, setTapping] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<Coordinate>({
    x: 0,
    y: 0,
  });

  const [compressStyle, setCompressStyle] = useState<null | {
    transform: string;
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
    handleTouchStart: ({ touches }: React.TouchEvent<TapTargetHTMLElement>) => {
      setTapping(true);
      // @ts-expect-error - TS2488 - Type 'TouchList' must have a '[Symbol.iterator]()' method that returns an iterator.
      const [touch] = touches;
      if (touch) {
        setCoordinate({
          x: touch.clientX,
          y: touch.clientY,
        });
      }
    },
    handleTouchMove: ({ touches }: React.TouchEvent<TapTargetHTMLElement>) => {
      // @ts-expect-error - TS2488 - Type 'TouchList' must have a '[Symbol.iterator]()' method that returns an iterator.
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
