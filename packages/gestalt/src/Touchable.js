// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import borders from './Borders.css';
import styles from './Touchable.css';
import { fromClassName, identity, toProps, type Style } from './style.js';
import { bind, range } from './transforms.js';

type MouseCursor =
  | 'copy'
  | 'grab'
  | 'grabbing'
  | 'move'
  | 'noDrop'
  | 'pointer'
  | 'zoomIn'
  | 'zoomOut';

type Coordinate = {|
  +x: number,
  +y: number,
|};

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

type TapStyle = 'none' | 'compress';

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  children?: React.Node,
  disabled?: boolean,
  forwardedRef?: React.Ref<'div'>,
  fullHeight?: boolean,
  fullWidth?: boolean,
  mouseCursor?: MouseCursor,
  onBlur?: ({ event: SyntheticFocusEvent<HTMLDivElement> }) => void,
  onFocus?: ({ event: SyntheticFocusEvent<HTMLDivElement> }) => void,
  onMouseEnter?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onTouch?: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
  tapStyle?: TapStyle,
  rounding?: Rounding,
|};

const SCROLL_DISTANCE = 10;
const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

const RoundingPropType = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  'circle',
  'pill',
]);

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === 'number') {
    return bind(range('rounding'), borders)(r);
  }

  if (r === 'circle') {
    return fromClassName(borders.circle);
  }

  if (r === 'pill') {
    return fromClassName(borders.pill);
  }

  return identity();
};

function Touchable({
  accessibilityControls,
  accessibilityExpanded,
  accessibilityHaspopup,
  accessibilityLabel,
  children,
  disabled = false,
  forwardedRef,
  fullHeight,
  fullWidth = true,
  mouseCursor = 'pointer',
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onTouch,
  tapStyle = 'none',
  rounding = 0,
}: Props) {
  const [isTapping, setTapping] = React.useState<boolean>(false);
  const [coordinate, setCoordinate] = React.useState<Coordinate>({
    x: 0,
    y: 0,
  });

  const classes = classnames(
    styles.touchable,
    toProps(getRoundingStyle(rounding)).className,
    {
      [styles.fullHeight]: fullHeight,
      [styles.fullWidth]: fullWidth,
      [styles[mouseCursor]]: !disabled,
      [styles.tapCompress]: !disabled && tapStyle === 'compress' && isTapping,
    }
  );

  return (
    <div
      aria-controls={accessibilityControls}
      aria-disabled={disabled}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      onContextMenu={event => event.preventDefault()}
      onClick={event => {
        if (!disabled && onTouch) {
          onTouch({ event });
        }
      }}
      onBlur={event => {
        if (!disabled && onBlur) {
          onBlur({ event });
        }
        setTapping(false);
      }}
      onFocus={event => {
        if (!disabled && onFocus) {
          onFocus({ event });
        }
        event.stopPropagation();
      }}
      onMouseEnter={event => {
        if (!disabled && onMouseEnter) {
          onMouseEnter({ event });
        }
      }}
      onMouseLeave={event => {
        if (!disabled && onMouseLeave) {
          onMouseLeave({ event });
        }
      }}
      onMouseDown={() => setTapping(true)}
      onMouseUp={() => setTapping(false)}
      onKeyPress={event => {
        // Check to see if space or enter were pressed
        if (
          !disabled &&
          onTouch &&
          (event.charCode === SPACE_CHAR_CODE ||
            event.charCode === ENTER_CHAR_CODE)
        ) {
          // Prevent the default action to stop scrolling when space is pressed
          event.preventDefault();
          onTouch({ event });
        }
      }}
      onTouchStart={({ touches }) => {
        setTapping(true);
        const [touch] = touches;
        if (touch) {
          setCoordinate({
            x: touch.clientX,
            y: touch.clientY,
          });
        }
      }}
      onTouchMove={({ touches }) => {
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
      }}
      onTouchCancel={() => setTapping(false)}
      onTouchEnd={() => setTapping(false)}
      ref={forwardedRef}
      role="button"
      tabIndex={disabled ? null : '0'}
    >
      {children}
    </div>
  );
}

Touchable.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mouseCursor: PropTypes.oneOf([
    'copy',
    'grab',
    'grabbing',
    'move',
    'noDrop',
    'pointer',
    'zoomIn',
    'zoomOut',
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onTouch: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  tapStyle: PropTypes.oneOf(['none', 'compress']),
  rounding: RoundingPropType,
};

const forwardRef = (props, ref) => <Touchable {...props} forwardedRef={ref} />;
forwardRef.displayName = 'Touchable';

export default React.forwardRef<Props, HTMLDivElement>(forwardRef);
