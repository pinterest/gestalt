// @flow strict
import { type Node, useEffect } from 'react';
import { autoUpdate, offset, shift, type Side, useFloating } from '@floating-ui/react';
import classnames from 'classnames';
import borders from '../Borders.css';
import Caret from '../Caret.js';
import colors from '../Colors.css';
import styles from '../Contents.css';
import { type MainDirections } from '../utils/positioningTypes.js';
import { CARET_HEIGHT, CARET_WIDTH } from '../utils/positioningUtils.js';

export type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type Props = {|
  accessibilityLabel?: string,
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: Node,
  id: ?string,
  idealDirection?: MainDirections,
  onKeyDown: (event: SyntheticKeyboardEvent<HTMLElement>) => void,
  role: ?Role,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  width: ?number,

  // eslint-disable-next-line react/no-unused-prop-types
  positionRelativeToAnchor?: boolean,
|};

const DIRECTIONS_MAP: Record<MainDirections, Side> = {
  down: 'bottom',
  forceDown: 'bottom',
  left: 'left',
  right: 'right',
  up: 'top',
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
}: Props): Node {
  // const { caretOffset, popoverOffset, popoverDir } = this.state;
  const popoverDir = idealDirection ? DIRECTIONS_MAP[idealDirection] : 'up';

  // Needed to prevent UI thrashing
  // const visibility = popoverDir === null ? 'hidden' : 'visible';
  const background = bgColor === 'white' ? `${bgColor}BgElevated` : `${bgColor}Bg`;
  const bgColorElevated = bgColor === 'white' ? 'whiteElevated' : bgColor;
  const isCaretVertical = ['down', 'up'].includes(popoverDir);

  // const { top, height } = this.calcTopHeight();
  // Top value is used only when the current top value is negative
  // const topValue = top != null && (popoverOffset?.top ?? 0) < 0 ? { top } : {};

  const { refs, floatingStyles } = useFloating({
    elements: { reference: anchor },
    middleware: [offset(8), shift({ padding: 8 })],
    placement: popoverDir,
    whileElementsMounted: (reference, floating, update) =>
      autoUpdate(reference, floating, update, { layoutShift: false, ancestorScroll: false }),
  });

  const popoverCaret = caret && idealDirection && (
    <div
      className={classnames(colors[bgColorElevated], styles.caret)}
      // style={{ ...caretOffset }} // caretOffset positions the Caret on the Popover
    >
      <Caret
        direction={idealDirection}
        height={isCaretVertical ? CARET_HEIGHT : CARET_WIDTH}
        width={isCaretVertical ? CARET_WIDTH : CARET_HEIGHT}
      />
    </div>
  );

  useEffect(() => {
    if (shouldFocus && refs.floating.current) {
      refs.floating.current.focus();
    }
  }, [refs.floating, shouldFocus]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className={classnames(
        styles.container,
        rounding === 2 && borders.rounding2,
        rounding === 4 && borders.rounding4,
        styles.contents,
        styles.maxDimensions,
        width !== null && styles.minDimensions,
      )}
      ref={refs.setFloating}
      tabIndex={-1}
      // popoverOffset positions the Popover component
      style={floatingStyles}
    >
      {popoverCaret}
      <div
        aria-label={accessibilityLabel}
        id={id}
        role={role}
        className={classnames(
          border && styles.border,
          colors[background],
          colors[bgColorElevated],
          rounding === 2 && borders.rounding2,
          rounding === 4 && borders.rounding4,
          styles.innerContents,
          styles.maxDimensions,
          width !== null && styles.minDimensions,
        )}
        style={{
          maxWidth: width,
          // maxHeight: height
        }}
      >
        {children}
      </div>
    </div>
  );
}
