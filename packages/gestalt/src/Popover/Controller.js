// @flow strict
import { type Node as ReactNode } from 'react';
import Contents, { type Role } from './Contents.js';
import OutsideEventBehavior from '../behaviors/OutsideEventBehavior.js';
import { ESCAPE } from '../keyCodes.js';

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
};

type Props = {|
  accessibilityLabel?: string,
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: ReactNode,
  onKeyDown?: ({| event: SyntheticKeyboardEvent<HTMLElement> |}) => void,
  id?: ?string,
  idealDirection?: 'up' | 'right' | 'down' | 'left' | 'forceDown',
  onDismiss: () => void,
  positionRelativeToAnchor: boolean,
  role?: ?Role,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,

  // eslint-disable-next-line react/no-unused-prop-types
  __dangerouslyIgnoreScrollBoundaryContainerSize?: boolean,
|};

export default function Controller({
  accessibilityLabel,
  anchor,
  bgColor,
  border,
  caret,
  children,
  id,
  idealDirection,
  positionRelativeToAnchor,
  role,
  rounding,
  shouldFocus,
  size = 'sm',
  onDismiss,
  onKeyDown,
}: Props): ReactNode {
  const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    if (event.keyCode === ESCAPE) {
      onDismiss();
    }
    onKeyDown?.({ event });
  };

  const handlePageClick = (event: Event) => {
    if (event.target instanceof Node && !anchor.contains(event.target)) {
      onDismiss();
    }
  };

  return (
    <OutsideEventBehavior onClick={handlePageClick}>
      <Contents
        accessibilityLabel={accessibilityLabel}
        anchor={anchor}
        bgColor={bgColor}
        border={border}
        caret={caret}
        id={id}
        idealDirection={idealDirection}
        onKeyDown={handleKeyDown}
        positionRelativeToAnchor={positionRelativeToAnchor}
        role={role}
        rounding={rounding}
        shouldFocus={shouldFocus}
        width={width}
      >
        {children}
      </Contents>
    </OutsideEventBehavior>
  );
}
