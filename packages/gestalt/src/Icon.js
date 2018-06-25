// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Icon.css';
import icons from './icons/index.js';
import colors from './Colors.css';

type IconProps = {
  accessibilityLabel: string,
  color?:
    | 'blue'
    | 'darkGray'
    | 'eggplant'
    | 'gray'
    | 'green'
    | 'lightGray'
    | 'maroon'
    | 'midnight'
    | 'navy'
    | 'olive'
    | 'orange'
    | 'orchid'
    | 'pine'
    | 'purple'
    | 'red'
    | 'watermelon'
    | 'white',
  inline?: boolean,
  size?: number | string,
};

type IconNoPath = {
  icon: $Keys<typeof icons>,
  dangerouslySetSvgPath?: null,
};

type PathNoIcon = {
  icon?: null,
  dangerouslySetSvgPath: { __path: string },
};

type Props = IconProps & (PathNoIcon | IconNoPath);

const IconNames = Object.keys(icons);

export default function Icon(props: Props) {
  const {
    accessibilityLabel,
    color = 'gray',
    icon,
    inline,
    size = 16,
    dangerouslySetSvgPath,
  } = props;

  const cs = classnames(styles.icon, colors[color], {
    [styles.iconBlock]: !inline,
  });

  const path =
    (icon && icons[icon]) ||
    /* eslint-disable-next-line no-underscore-dangle */
    (dangerouslySetSvgPath && dangerouslySetSvgPath.__path) ||
    undefined;

  const ariaHidden = accessibilityLabel === '' ? true : null;

  return (
    <svg
      className={cs}
      height={size}
      width={size}
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
      aria-label={accessibilityLabel}
      role="img"
    >
      <title>{accessibilityLabel}</title>
      <path d={path} />
    </svg>
  );
}

Icon.icons = IconNames;

Icon.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'blue',
    'darkGray',
    'eggplant',
    'gray',
    'green',
    'lightGray',
    'maroon',
    'midnight',
    'navy',
    'olive',
    'orange',
    'orchid',
    'pine',
    'purple',
    'red',
    'watermelon',
    'white',
  ]),
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string,
  }),
  icon: PropTypes.oneOf(IconNames),
  inline: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
