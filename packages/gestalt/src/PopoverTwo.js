// @flow strict
import { type Node, useState } from 'react';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
// import Caret from './Caret.js';
import borders from './Borders.css';

// import { CARET_HEIGHT, CARET_WIDTH } from './utils/positioningUtils.js';
import colors from './Colors.css';
import styles from './Contents.css';
import PopoverStyles from './PopoverTwo.css';

export type Role = 'dialog' | 'listbox' | 'menu';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
  /**
   * Prop description.
   */
  showCaret?: boolean,
  /**
   * Prop description.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   * Prop description.
   */
  role?: Role,

  color?: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  id?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,
  children?: Node,
  anchor: ?HTMLElement,
|};

const IDEAL_DIRECTION = {
  up: 'top',
  right: 'right',
  left: 'left',
  down: 'bottom',
};

// const IDEAL_DIRECTION_INVERSION = {
//   up: 'bottom',
//   right: 'left',
//   left: 'right',
//   down: 'top',
// };

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
};

/**
 * [PopoverTwo] https://gestalt.pinterest.systems/web/popovertwo component should be used for ... on the page.
 */
export default function PopoverTwo({
  accessibilityLabel,
  color = 'white',
  showCaret = false,
  role = 'dialog',
  idealDirection = 'down',
  anchor,
  id,
  size = 'sm',
  children,
}: Props): Node {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { attributes, styles: popperStyles } = usePopper(anchor, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: { offset: [0, 8] },
      },
    ],
    placement: IDEAL_DIRECTION[idealDirection],
  });

  // const isCaretVertical = ['down', 'up'].includes(idealDirection);
  const background = color === 'white' ? `${color}BgElevated` : `${color}Bg`;
  const bgColorElevated = color === 'white' ? 'whiteElevated' : color;
  const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;
  // const caretMoveTo: string = IDEAL_DIRECTION_INVERSION[idealDirection];

  return (
    <div
      {...attributes.popper}
      role={role}
      id={id}
      aria-label={accessibilityLabel}
      ref={setPopperElement}
      style={{ ...popperStyles.popper, maxWidth: width }}
      className={classnames(
        styles.border,
        colors[background],
        colors[bgColorElevated],
        borders.rounding4,
        styles.maxDimensions,
        width !== null && styles.minDimensions,
        PopoverStyles.tooltip,
      )}
    >
      <div tab-index={0}>{children}</div>
      {showCaret && (
        <div
          id="arrow"
          data-popper-arrow
          ref={setArrowElement}
          className={classnames(colors[bgColorElevated], PopoverStyles.arrow)}
          style={{
            ...popperStyles.arrow,
            // [caretMoveTo]: isCaretVertical ? -CARET_HEIGHT : -CARET_WIDTH,
          }}
        />
      )}
    </div>
  );
}
