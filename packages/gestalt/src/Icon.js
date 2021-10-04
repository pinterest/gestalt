// @flow strict
import type { Node } from 'react';
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
  /**
   * Label for screen readers to announce Icon.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/icon#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string,
  /**
   * These are all the colors available to apply to the Icon; however, we advise only using primary colors within the product to ensure consistency and accessible color contrast.
   *
   * See the [primary-color combinations](https://gestalt.pinterest.systems/icon#Primary-color-combinations) variant to learn more.
   */
  color?: IconColor,
  /**
   * SVG icon from the Gestalt icon library to use within Icon..
   *
   * See the [iconography and SVG](https://gestalt.pinterest.systems/iconography_and_svgs) guidelines to explore the Gestalt icon library.
   */
  icon?: $Keys<typeof icons>,
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   *
   * See the [custom icon](https://gestalt.pinterest.systems/icon#Custom-icon) variant to learn more.
   */
  dangerouslySetSvgPath?: {| __path: string |},
  /**
   * Properly positions Icon relative to an inline element, such as Text using the inline property.
   */
  inline?: boolean,
  /**
   * Use a number for pixel sizes or a string for percentage based sizes.
   *
   * See the [size](https://gestalt.pinterest.systems/icon#Size) variant to learn more.
   */
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

/**
 * https://gestalt.pinterest.systems/Icon
 */
export default function Icon({
  accessibilityLabel,
  color = 'gray',
  dangerouslySetSvgPath,
  icon,
  inline = false,
  size = 16,
}: Props): Node {
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
