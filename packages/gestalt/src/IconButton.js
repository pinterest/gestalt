// @flow strict
import React, { type Node, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from './icons/index.js';
import Pog from './Pog.js';
import styles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useTapFeedback from './useTapFeedback.js';

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel: string,
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  dangerouslySetSvgPath?: {| __path: string |},
  disabled?: boolean,
  icon?: $Keys<typeof icons>,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white',
  onClick?: ({| event: SyntheticMouseEvent<> |}) => void,
  padding?: 1 | 2 | 3 | 4 | 5,
  selected?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

export default function IconButton({
  accessibilityControls,
  accessibilityExpanded,
  accessibilityHaspopup,
  accessibilityLabel,
  bgColor,
  dangerouslySetSvgPath,
  disabled,
  icon,
  iconColor,
  onClick,
  padding,
  selected,
  size,
}: Props): Node {
  const buttonElement = useRef(null);

  const {
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback(buttonElement);

  const [isActive, setActive] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
  const [isHovered, setHovered] = React.useState(false);

  const classes = classnames(styles.button, touchableStyles.tapTransition, {
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: isTapping,
  });

  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      onBlur={() => {
        handleBlur();
        setFocused(false);
      }}
      onClick={event => onClick && onClick({ event })}
      onFocus={() => setFocused(true)}
      onMouseDown={() => {
        handleMouseDown();
        setActive(true);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setActive(false);
        setHovered(false);
      }}
      onMouseUp={() => {
        handleMouseUp();
        setActive(false);
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      type="button"
    >
      <Pog
        active={!disabled && isActive}
        bgColor={bgColor}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        focused={!disabled && isFocused}
        hovered={!disabled && isHovered}
        icon={icon}
        iconColor={iconColor}
        padding={padding}
        selected={selected}
        size={size}
      />
    </button>
  );
}

IconButton.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string.isRequired,
  bgColor: PropTypes.oneOf([
    'transparent',
    'darkGray',
    'transparentDarkGray',
    'gray',
    'lightGray',
    'white',
    'red',
  ]),
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(Object.keys(icons)),
  iconColor: PropTypes.oneOf(['gray', 'darkGray', 'red', 'white']),
  onClick: PropTypes.func,
  padding: PropTypes.oneOf([1, 2, 3, 4, 5]),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
