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
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  children?: React.Node,
  disabled?: boolean,
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
  rounding?: Rounding,
|};

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

export default class Touchable extends React.Component<Props> {
  static propTypes = {
    accessibilityControls: PropTypes.string,
    accessibilityExpanded: PropTypes.bool,
    accessibilityHaspopup: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
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
    rounding: RoundingPropType,
  };

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { disabled, onTouch } = this.props;
    // Check to see if space or enter were pressed
    if (
      !disabled &&
      onTouch &&
      (event.charCode === SPACE_CHAR_CODE || event.charCode === ENTER_CHAR_CODE)
    ) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onTouch({ event });
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLDivElement>) => {
    const { disabled, onBlur } = this.props;
    if (!disabled && onBlur) {
      onBlur({ event });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLDivElement>) => {
    const { disabled, onFocus } = this.props;
    if (!disabled && onFocus) {
      onFocus({ event });
    }
  };

  handleMouseEnter = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { disabled, onMouseEnter } = this.props;
    if (!disabled && onMouseEnter) {
      onMouseEnter({ event });
    }
  };

  handleMouseLeave = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { disabled, onMouseLeave } = this.props;
    if (!disabled && onMouseLeave) {
      onMouseLeave({ event });
    }
  };

  handleClick = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { disabled, onTouch } = this.props;
    if (!disabled && onTouch) {
      onTouch({ event });
    }
  };

  render() {
    const {
      accessibilityControls,
      accessibilityExpanded,
      accessibilityHaspopup,
      accessibilityLabel,
      children,
      disabled = false,
      fullWidth = true,
      fullHeight,
      mouseCursor = 'pointer',
      rounding = 0,
    } = this.props;

    const classes = classnames(
      styles.touchable,
      toProps(getRoundingStyle(rounding)).className,
      {
        [styles.fullHeight]: fullHeight,
        [styles.fullWidth]: fullWidth,
        [styles[mouseCursor]]: !disabled,
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
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex={disabled ? null : '0'}
      >
        {children}
      </div>
    );
  }
}
