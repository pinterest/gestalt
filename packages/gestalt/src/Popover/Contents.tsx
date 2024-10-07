import { ReactNode, useEffect, useRef } from 'react';
import { FloatingFocusManager, Side } from '@floating-ui/react';
import classnames from 'classnames';
import usePopover, { SIDES_MAP } from './usePopover';
import borderStyles from '../Borders.css';
import { Overflow } from '../boxTypes';
import Caret from '../Caret';
import styles from '../Contents.css';
import layoutStyles from '../Layout.css';

const CARET_HEIGHT = 4;
const CARET_WIDTH = 12;

export type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type MainDirections = 'up' | 'right' | 'down' | 'left';

const DIRECTIONS_MAP: Record<MainDirections, Side> = {
  down: 'bottom',
  left: 'left',
  right: 'right',
  up: 'top',
};

type Props = {
  accessibilityLabel?: string;
  anchor: HTMLElement;
  bgColor?: 'blue' | 'darkGray' | 'white';
  border?: boolean;
  caret?: boolean;
  children?: ReactNode;
  id: string | undefined;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  forceDirection?: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  role: Role | undefined;
  rounding?: 2 | 4;
  shouldFocus?: boolean;
  width: number | undefined;
  scrollBoundary?: HTMLElement;
  hideWhenReferenceHidden?: boolean;
  onPositioned?: () => void;
  shouldTrapFocus?: boolean;
  overflow?: Extract<Overflow, 'auto' | 'hidden' | 'visible'>;
};

export default function Contents({
  accessibilityLabel,
  anchor,
  bgColor,
  border = true,
  caret = true,
  children,
  id,
  idealDirection,
  forceDirection,
  role,
  rounding,
  width,
  shouldFocus = true,
  onKeyDown,
  scrollBoundary,
  hideWhenReferenceHidden,
  onPositioned,
  shouldTrapFocus,
  overflow,
}: Props) {
  const caretRef = useRef<HTMLElement | null>(null);

  let idealPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top';

  if (idealDirection) {
    idealPlacement = DIRECTIONS_MAP[idealDirection];
  }

  const { refs, placement, floatingStyles, middlewareData, context, isPositioned } = usePopover({
    anchor,
    caretElement: caretRef.current,
    caretPadding: rounding && rounding * 4,
    forceDirection,
    direction: idealPlacement,
    scrollBoundary,
    hideWhenReferenceHidden,
    onPositioned,
  });

  const caretOffset = middlewareData.arrow;
  const isAnchorInViewport = middlewareData.hide?.referenceHidden === true;

  const isCaretVertical = placement === 'top' || placement === 'bottom';

  useEffect(() => {
    if (shouldFocus && refs.floating.current && isPositioned) {
      refs.floating.current.focus();
    }
  }, [isPositioned, refs.floating, shouldFocus]);

  useEffect(() => {
    // @ts-expect-error - TS2769 - No overload matches this call.
    window.addEventListener('keydown', onKeyDown);
    // @ts-expect-error - TS2769 - No overload matches this call.
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <FloatingFocusManager
      context={context}
      disabled={role === 'tooltip' || role === 'listbox'}
      modal={shouldTrapFocus ?? false}
      returnFocus={false}
    >
      <div
        ref={refs.setFloating}
        className={classnames(
          layoutStyles.absolute,
          layoutStyles.block,
          layoutStyles.borderBox,
          borderStyles.shadow,
          {
            [borderStyles.rounding2]: rounding === 2,
            [borderStyles.rounding4]: rounding === 4,
          },
        )}
        style={{
          ...floatingStyles,
          visibility: isAnchorInViewport ? 'hidden' : 'visible',
          outline: 'none', // inlined to aviod overrides by non-Gestalt CSS
        }}
        tabIndex={-1}
      >
        {caret && (
          <div
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
            ref={caretRef}
            className={classnames(styles.caret, layoutStyles.flex, layoutStyles.absolute, {
              [styles.caretPrimary]: bgColor === 'white',
              [styles.caretSecondary]: bgColor === 'darkGray',
              [styles.caretEducation]: bgColor === 'blue',
            })}
            style={{
              left: caretOffset?.x,
              top: caretOffset?.y,
              [placement]: '100%',
            }}
          >
            <Caret
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'Placement' can't be used to index type 'Record<Side, MainDirections>'.
              direction={SIDES_MAP[placement]}
              height={isCaretVertical ? CARET_HEIGHT : CARET_WIDTH}
              width={isCaretVertical ? CARET_WIDTH : CARET_HEIGHT}
            />
          </div>
        )}

        <div
          aria-label={accessibilityLabel}
          className={classnames(layoutStyles.relative, styles.maxDimensions, {
            [styles.minDimensions]: width != null,
            [styles.border]: border,
            [styles.primary]: bgColor === 'white',
            [styles.secondary]: bgColor === 'darkGray',
            [styles.education]: bgColor === 'blue',
            [borderStyles.rounding2]: rounding === 2,
            [borderStyles.rounding4]: rounding === 4,
          })}
          id={id}
          role={role}
          style={{ maxWidth: width, overflow }}
        >
          {children}
        </div>
      </div>
    </FloatingFocusManager>
  );
}
