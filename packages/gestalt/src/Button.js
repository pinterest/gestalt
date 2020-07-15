// @flow strict

import React, { type Element } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import styles from './Button.css';
import Text from './Text.js';
import { useColorScheme } from './contexts/ColorScheme.js';

const DEFAULT_TEXT_COLORS = {
  blue: 'white',
  gray: 'darkGray',
  red: 'white',
  transparent: 'white',
  white: 'darkGray',
};

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
};

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white',
  disabled?: boolean,
  iconEnd?: $Keys<typeof icons>,
  inline?: boolean,
  name?: string,
  onClick?: ({| event: SyntheticMouseEvent<> |}) => void,
  selected?: boolean,
  size?: 'sm' | 'md' | 'lg',
  text: string,
  textColor?: 'white' | 'darkGray' | 'blue' | 'red',
  type?: 'submit' | 'button',
|};

export default function Button(props: Props): Element<'button'> {
  const {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    color = 'gray',
    disabled = false,
    iconEnd,
    inline = false,
    name,
    onClick,
    selected = false,
    size = 'md',
    text,
    textColor: textColorProp,
    type = 'button',
  } = props;
  const { name: colorSchemeName } = useColorScheme();
  // We need to make a few exceptions for accessibility reasons in darkMode for red buttons
  const isDarkMode = colorSchemeName === 'darkMode';
  const isDarkModeRed = isDarkMode && color === 'red';

  let colorClass = color;

  if (isDarkModeRed) {
    colorClass = 'darkModeRed';
  } else if (isDarkMode && color === 'gray') {
    colorClass = 'darkModeGray';
  }

  const classes = classnames(styles.button, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    [styles.solid]: color !== 'transparent',
    [styles[colorClass]]: !disabled && !selected,
    [styles.selected]: !disabled && selected,
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [styles.inline]: inline,
    [styles.block]: !inline,
  });

  const textColor =
    (disabled && 'gray') ||
    (selected && 'white') ||
    (isDarkModeRed && 'darkGray') ||
    textColorProp ||
    DEFAULT_TEXT_COLORS[color];

  const buttonText = (
    <Text align="center" color={textColor} overflow="normal" weight="bold">
      {text}
    </Text>
  );

  /* eslint-disable react/button-has-type */
  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      name={name}
      onClick={event => onClick && onClick({ event })}
      type={type}
    >
      {iconEnd ? (
        <Box alignItems="center" display="flex">
          {buttonText}

          <Box display="inlineBlock" flex="none" marginStart={2}>
            <Icon
              accessibilityLabel=""
              color={textColor}
              icon={iconEnd}
              size={SIZE_NAME_TO_PIXEL[size]}
            />
          </Box>
        </Box>
      ) : (
        buttonText
      )}
    </button>
  );
  /* eslint-enable react/button-has-type */
}

Button.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'gray', 'red', 'transparent', 'white']),
  disabled: PropTypes.bool,
  iconEnd: PropTypes.oneOf(Object.keys(icons)),
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(['white', 'darkGray', 'blue', 'red']),
  type: PropTypes.oneOf(['button', 'submit']),
};
