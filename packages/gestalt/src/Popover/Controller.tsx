import { ReactNode } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import Contents, { Role } from './Contents';
import OutsideEventBehavior from '../behaviors/OutsideEventBehavior';
import { Overflow } from '../boxTypes';
import { ESCAPE } from '../keyCodes';

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
} as const;

type Props = {
  accessibilityLabel?: string;
  anchor: HTMLElement;
  bgColor: 'blue' | 'darkGray' | 'white';
  border?: boolean;
  caret?: boolean;
  children?: ReactNode;
  dataTestId?: string;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLElement> }) => void;
  id?: string;
  idealDirection?: 'up' | 'right' | 'down' | 'left' | 'forceDown';
  onDismiss: () => void;
  role?: Role;
  rounding?: 2 | 4;
  shouldFocus?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  disablePortal?: boolean;
  scrollBoundary?: HTMLElement;
  hideWhenReferenceHidden?: boolean;
  onPositioned?: () => void;
  shouldTrapFocus?: boolean;
  overflow?: Extract<Overflow, 'auto' | 'hidden' | 'visible'>;
};

export default function Controller({
  accessibilityLabel,
  anchor,
  bgColor,
  border,
  caret,
  children,
  dataTestId,
  id,
  idealDirection,
  role,
  rounding,
  shouldFocus,
  size,
  onDismiss,
  onKeyDown,
  disablePortal,
  scrollBoundary,
  hideWhenReferenceHidden,
  onPositioned,
  shouldTrapFocus,
  overflow,
}: Props) {
  const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
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

  const contents = (
    <OutsideEventBehavior onClick={handlePageClick} dataTestId={dataTestId}>
      <Contents
        accessibilityLabel={accessibilityLabel}
        anchor={anchor}
        bgColor={bgColor}
        border={border}
        caret={caret}
        hideWhenReferenceHidden={hideWhenReferenceHidden}
        id={id}
        idealDirection={idealDirection}
        onKeyDown={handleKeyDown}
        onPositioned={onPositioned}
        overflow={overflow}
        role={role}
        rounding={rounding}
        scrollBoundary={scrollBoundary}
        shouldFocus={shouldFocus}
        shouldTrapFocus={shouldTrapFocus}
        width={width}
      >
        {children}
      </Contents>
    </OutsideEventBehavior>
  );

  return disablePortal ? contents : <FloatingPortal>{contents}</FloatingPortal>;
}
