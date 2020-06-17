// @flow strict
import * as React from 'react';

const SCROLL_DISTANCE = 10;
const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

type Coordinate = {|
  +x: number,
  +y: number,
|};

type TapTargetHTMLElement = HTMLDivElement;

export const keyPressShouldTriggerTap = (
  event: SyntheticKeyboardEvent<TapTargetHTMLElement>
) => [SPACE_CHAR_CODE, ENTER_CHAR_CODE].includes(event.charCode);

export default function useTapFeedback() {
  const [isTapping, setTapping] = React.useState<boolean>(false);
  const [coordinate, setCoordinate] = React.useState<Coordinate>({
    x: 0,
    y: 0,
  });
  return {
    isTapping,
    handleBlur: () => setTapping(false),
    handleMouseDown: () => setTapping(true),
    handleMouseUp: () => setTapping(false),
    handleTouchStart: ({
      touches,
    }: SyntheticTouchEvent<TapTargetHTMLElement>) => {
      setTapping(true);
      const [touch] = touches;
      if (touch) {
        setCoordinate({
          x: touch.clientX,
          y: touch.clientY,
        });
      }
    },
    handleTouchMove: ({
      touches,
    }: SyntheticTouchEvent<TapTargetHTMLElement>) => {
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
