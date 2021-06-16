// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon.js';
import icons from './icons/index.js';
import styles from './Pog.css';

const SIZE_NAME_TO_PADDING_PIXEL = {
  xs: 6,
  sm: 8,
  md: 11,
  lg: 14,
  xl: 16,
};

const SIZE_NAME_TO_ICON_SIZE_PIXEL = {
  xs: 12,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

type Props = {|
  // Omit accessibilityLabel if and only if an ancestor element already has the aria-label set.
  // This is similar to having empty `alt` attributes:
  // https://davidwalsh.name/accessibility-tip-empty-alt-attributes
  accessibilityLabel?: string,
  active?: boolean,
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  dangerouslySetSvgPath?: {| __path: string |},
  focused?: boolean,
  hovered?: boolean,
  icon?: $Keys<typeof icons>,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white',
  padding?: 1 | 2 | 3 | 4 | 5,
  selected?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

const defaultIconButtonIconColors = {
  darkGray: 'white',
  gray: 'white',
  lightGray: 'gray',
  transparent: 'gray',
  red: 'white',
  transparentDarkGray: 'white',
  white: 'gray',
};

/**
 * https://gestalt.pinterest.systems/Pog
 */
export default function Pog(props: Props): Node {
  const {
    accessibilityLabel = '',
    active = false,
    bgColor = 'transparent',
    dangerouslySetSvgPath,
    focused = false,
    hovered = false,
    icon,
    iconColor,
    padding,
    selected = false,
    size = 'md',
  } = props;

  const iconSizeInPx = SIZE_NAME_TO_ICON_SIZE_PIXEL[size];
  const paddingInPx = padding ? padding * 4 : SIZE_NAME_TO_PADDING_PIXEL[size];

  const color = (selected && 'white') || iconColor || defaultIconButtonIconColors[bgColor];

  const sizeInPx = iconSizeInPx + paddingInPx * 2;

  const inlineStyle = {
    height: sizeInPx,
    width: sizeInPx,
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
      <Icon
        accessibilityLabel={accessibilityLabel || ''}
        color={color}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        icon={icon}
        size={iconSizeInPx}
      />
    </div>
  );
}

Pog.propTypes = {
  accessibilityLabel: PropTypes.string,
  active: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  bgColor: PropTypes.oneOf([
    'transparent',
    'darkGray',
    'transparentDarkGray',
    'gray',
    'lightGray',
    'white',
    'red',
  ]),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string,
  }),
  focused: PropTypes.bool,
  hovered: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  icon: PropTypes.oneOf(Object.keys(icons)),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  iconColor: PropTypes.oneOf(['gray', 'darkGray', 'red', 'white']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  padding: PropTypes.oneOf([1, 2, 3, 4, 5]),
  selected: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
