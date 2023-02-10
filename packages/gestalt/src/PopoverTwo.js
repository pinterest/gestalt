// @flow strict
import { type Node, useState } from 'react';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import Caret from './Caret.js';
import borders from './Borders.css';

import { CARET_HEIGHT, CARET_WIDTH } from './utils/positioningUtils.js';
import colors from './Colors.css';
import styles from './Contents.css';

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
|};

const IDEAL_DIRECTION = {
  up: 'top',
  right: 'right',
  left: 'left',
  down: 'bottom',
};

const IDEAL_DIRECTION_INVERSION = {
  up: 'bottom',
  right: 'left',
  left: 'right',
  down: 'top',
};

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
  id,
  size = 'sm',
  children,
}: Props): Node {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { attributes, styles: popperStyles } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: { offset: [0, CARET_WIDTH] },
      },
    ],
    placement: IDEAL_DIRECTION[idealDirection],
  });

  const isCaretVertical = ['down', 'up'].includes(idealDirection);
  const background = color === 'white' ? `${color}BgElevated` : `${color}Bg`;
  const bgColorElevated = color === 'white' ? 'whiteElevated' : color;
  const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;
  const caretMoveTo: string = IDEAL_DIRECTION_INVERSION[idealDirection];

  return (
    <div>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>

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
          styles.innerContents,
          styles.maxDimensions,
          width !== null && styles.minDimensions,
        )}
      >
        {children}
        {showCaret && (
          <div
            data-popper-arrow
            ref={setArrowElement}
            className={classnames(colors[bgColorElevated], styles.caret)}
            style={{
              ...popperStyles.arrow,
              [caretMoveTo]: isCaretVertical ? -CARET_HEIGHT : -CARET_WIDTH,
            }}
          >
            <Caret
              direction={idealDirection}
              height={isCaretVertical ? CARET_HEIGHT : CARET_WIDTH}
              width={isCaretVertical ? CARET_WIDTH : CARET_HEIGHT}
            />
          </div>
        )}
      </div>
    </div>
  );
}
