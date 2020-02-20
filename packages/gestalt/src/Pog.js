// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import styles from './Pog.css';

const SIZE_NAME_TO_PIXEL = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

type Props = {|
  active?: boolean,
  bgColor?:
    | 'transparent'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'blue',
  dangerouslySetSvgPath?: { __path: string },
  focused?: boolean,
  hovered?: boolean,
  selected?: boolean,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue' | 'white' | 'orange',
  icon?: $Keys<typeof icons>,
  size?: $Keys<typeof SIZE_NAME_TO_PIXEL>,
|};

const defaultIconButtonIconColors = {
  blue: 'white',
  darkGray: 'white',
  gray: 'white',
  lightGray: 'gray',
  transparent: 'gray',
  transparentDarkGray: 'white',
  white: 'gray',
};

export default function Pog(props: Props) {
  const {
    active = false,
    bgColor = 'transparent',
    dangerouslySetSvgPath,
    focused = false,
    hovered = false,
    iconColor,
    icon,
    selected = false,
    size = 'md',
  } = props;

  const iconSize = SIZE_NAME_TO_PIXEL[size] / 2;
  const color =
    (selected && 'white') || iconColor || defaultIconButtonIconColors[bgColor];

  const inlineStyle = {
    height: SIZE_NAME_TO_PIXEL[size],
    width: SIZE_NAME_TO_PIXEL[size],
  };

  const classes = classnames(styles.pog, {
    [styles[bgColor]]: !selected,
    [styles.selected]: selected,
    [styles.active]: active,
    [styles.focused]: focused,
    [styles.hovered]: hovered && !focused && !active,
  });

  return (
    <div className={classes} style={inlineStyle}>
      <Box rounding="circle">
        {/*
          We're explicitly setting an empty string as a label on the Icon since we
          already have an aria-label on the button container.
          This is similar to having empty `alt` attributes:
          https://davidwalsh.name/accessibility-tip-empty-alt-attributes
        */}
        <Icon
          accessibilityLabel=""
          color={color}
          dangerouslySetSvgPath={dangerouslySetSvgPath}
          icon={icon}
          size={iconSize}
        />
      </Box>
    </div>
  );
}

Pog.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.oneOf([
    'transparent',
    'transparentDarkGray',
    'gray',
    'lightGray',
    'white',
    'blue',
  ]),
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string,
  }),
  focused: PropTypes.bool,
  hovered: PropTypes.bool,
  iconColor: PropTypes.oneOf([
    'gray',
    'darkGray',
    'red',
    'blue',
    'white',
    'orange',
  ]),
  icon: PropTypes.oneOf(Object.keys(icons)),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(SIZE_NAME_TO_PIXEL)),
};
