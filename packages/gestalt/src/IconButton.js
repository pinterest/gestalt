// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './IconButton.css';
import icons from './icons/index.js';
import Pog from './Pog.js';

type Props = {|
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
  dangerouslySetSvgPath?: { __path: string },
  disabled?: boolean,
  icon?: $Keys<typeof icons>,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white',
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  selected?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

export default function IconButton({
  accessibilityExpanded,
  accessibilityHaspopup,
  accessibilityLabel,
  bgColor,
  dangerouslySetSvgPath,
  disabled,
  icon,
  iconColor,
  selected,
  size,
  onClick,
}: Props) {
  const [isActive, setActive] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
  const [isHovered, setHovered] = React.useState(false);

  return (
    <button
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classnames(
        styles.button,
        disabled ? styles.disabled : styles.enabled
      )}
      disabled={disabled}
      onBlur={() => setFocused(false)}
      onClick={event => onClick && onClick({ event })}
      onFocus={() => setFocused(true)}
      onMouseDown={() => setActive(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setActive(false);
        setHovered(false);
      }}
      onMouseUp={() => setActive(false)}
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
        selected={selected}
        size={size}
      />
    </button>
  );
}

IconButton.propTypes = {
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
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
