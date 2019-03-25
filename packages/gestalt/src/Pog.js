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
    | 'white',
  focused?: boolean,
  hovered?: boolean,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue' | 'white',
  icon: $Keys<typeof icons>,
  size?: $Keys<typeof SIZE_NAME_TO_PIXEL>,
|};

const defaultIconButtonIconColors = {
  transparent: 'gray',
  gray: 'white',
  lightGray: 'gray',
  white: 'gray',
  transparentDarkGray: 'white',
};

export default function Pog(props: Props) {
  const {
    active = false,
    bgColor = 'transparent',
    focused = false,
    hovered = false,
    iconColor = defaultIconButtonIconColors[bgColor],
    icon,
    size = 'md',
  } = props;

  const iconSize = SIZE_NAME_TO_PIXEL[size] / 2;

  const inlineStyle = {
    height: SIZE_NAME_TO_PIXEL[size],
    width: SIZE_NAME_TO_PIXEL[size],
  };

  const classes = classnames(styles.pog, styles[bgColor], {
    [styles.active]: active,
    [styles.focused]: focused,
    [styles.hovered]: hovered && !focused && !active,
  });

  return (
    <div className={classes} style={inlineStyle}>
      <Box shape="circle">
        {/*
          We're explicitly setting an empty string as a label on the Icon since we
          already have an aria-label on the button container.
          This is similar to having empty `alt` attributes:
          https://davidwalsh.name/accessibility-tip-empty-alt-attributes
        */}
        <Icon
          accessibilityLabel=""
          color={iconColor}
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
  ]),
  focused: PropTypes.bool,
  hovered: PropTypes.bool,
  iconColor: PropTypes.oneOf(['gray', 'darkGray', 'red', 'blue', 'white']),
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  size: PropTypes.oneOf(Object.keys(SIZE_NAME_TO_PIXEL)),
};
