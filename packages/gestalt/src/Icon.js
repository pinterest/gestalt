// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Icon.css';
import icons from './icons/index.js';
import colors from './Colors.css';

export type IconColor =
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
  | 'white';

type Props = {|
  accessibilityLabel: string,
  color?: IconColor,
  icon?: $Keys<typeof icons>,
  dangerouslySetSvgPath?: {| __path: string |},
  inline?: boolean,
  size?: number | string,
|};

// $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
const IconNames = Object.keys(icons);

const flipOnRtlIconNames = [
  'ads-stats',
  'ads-overview',
  'arrow-back',
  'arrow-circle-forward',
  'arrow-end',
  'arrow-forward',
  'arrow-start',
  'arrow-up-right',
  'compose',
  'directional-arrow-left',
  'directional-arrow-right',
  'flipVertical',
  'hand-pointing',
  'link',
  'reorder-images',
  'send',
  'sound',
  'speech',
  'speech-ellipsis',
  'switch-account',
  'text-size',
];

export default function Icon(props: Props): Node {
  const {
    accessibilityLabel,
    color = 'gray',
    dangerouslySetSvgPath,
    icon,
    inline,
    size = 16,
  } = props;

  const cs = classnames(
    flipOnRtlIconNames.includes(icon) && styles.rtlSupport,
    styles.icon,
    colors[color],
    { [styles.iconBlock]: !inline },
  );

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
      <path d={path} />
    </svg>
  );
}

Icon.icons = IconNames;

Icon.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
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
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  icon: PropTypes.oneOf(IconNames),
  inline: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
