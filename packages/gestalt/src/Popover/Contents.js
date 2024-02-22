// @flow strict
import { type Node as ReactNode, useEffect, useRef } from 'react';
import { FloatingFocusManager } from '@floating-ui/react';
import classnames from 'classnames';
import usePopover, { DIRECTIONS_MAP, SIDES_MAP } from './usePopover';
import borders from '../Borders.css';
import Caret from '../Caret';
import styles from '../Contents.css';
import { type MainDirections } from '../utils/positioningTypes';
import { CARET_HEIGHT, CARET_WIDTH } from '../utils/positioningUtils';

export type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type Props = {
  accessibilityLabel?: string,
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: ReactNode,
  id: ?string,
  idealDirection?: MainDirections,
  onKeyDown: (event: SyntheticKeyboardEvent<HTMLElement>) => void,
  role: ?Role,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  width: ?number,
  scrollBoundary?: HTMLElement,
  hideWhenReferenceHidden?: boolean,
  onPositioned?: () => void,
  shouldTrapFocus?: boolean,
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
  role,
  rounding,
  width,
  shouldFocus = true,
  onKeyDown,
  scrollBoundary,
  hideWhenReferenceHidden,
  onPositioned,
  shouldTrapFocus,
}: Props): ReactNode {
  const caretRef = useRef<HTMLElement | null>(null);
  const idealPlacement = idealDirection ? DIRECTIONS_MAP[idealDirection] : 'top';

  const { refs, placement, floatingStyles, middlewareData, context, isPositioned } = usePopover({
    anchor,
    caretElement: caretRef.current,
    direction: idealPlacement,
    scrollBoundary,
    hideWhenReferenceHidden,
    onPositioned,
  });

  const caretOffset = middlewareData.arrow;
  const visibility = middlewareData.hide?.referenceHidden === true ? 'hidden' : 'visible';

  const isCaretVertical = placement === 'top' || placement === 'bottom';

  useEffect(() => {
    if (shouldFocus && refs.floating.current && isPositioned) {
      refs.floating.current.focus();
    }
  }, [isPositioned, refs.floating, shouldFocus]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <FloatingFocusManager
      disabled={role === 'tooltip'}
      context={context}
      returnFocus={false}
      modal={shouldTrapFocus ?? false}
    >
      <div
        ref={refs.setFloating}
        tabIndex={-1}
        className={classnames(
          styles.container,
          rounding === 2 && borders.rounding2,
          rounding === 4 && borders.rounding4,
          styles.contents,
          styles.maxDimensions,
          width !== null && styles.minDimensions,
        )}
        style={{ ...floatingStyles, visibility }}
      >
        {caret && (
          <div
            ref={caretRef}
            className={classnames(styles.caret, {
              [styles.caretPrimary]: bgColor === 'white',
              [styles.caretSecondary]: bgColor === 'darkGray',
              [styles.caretEducation]: bgColor === 'blue',
            })}
            style={{
              left: caretOffset?.x != null ? `${caretOffset.x}px` : '',
              top: caretOffset?.y != null ? `${caretOffset.y}px` : '',
              [placement]: '100%',
            }}
          >
            <Caret
              direction={SIDES_MAP[placement]}
              height={isCaretVertical ? CARET_HEIGHT : CARET_WIDTH}
              width={isCaretVertical ? CARET_WIDTH : CARET_HEIGHT}
            />
          </div>
        )}

        <div
          aria-label={accessibilityLabel}
          id={id}
          role={role}
          className={classnames(
            border && styles.border,
            rounding === 2 && borders.rounding2,
            rounding === 4 && borders.rounding4,
            styles.innerContents,
            styles.maxDimensions,
            width !== null && styles.minDimensions,
            {
              [styles.primary]: bgColor === 'white',
              [styles.secondary]: bgColor === 'darkGray',
              [styles.education]: bgColor === 'blue',
            },
          )}
          style={{
            maxWidth: width,
          }}
        >
          {children}
        </div>
      </div>
    </FloatingFocusManager>
  );
}
