// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import styles from './Icon.css';
import icons from './icons/index.js';
import colors from './Colors.css';

const semanticColors = [
  'default',
  'subtle',
  'success',
  'error',
  'warning',
  'inverse',
  'shopping',
  'brand',
  'light',
  'dark',
];

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
  | 'white'
  | 'default'
  | 'subtle'
  | 'success'
  | 'error'
  | 'warning'
  | 'inverse'
  | 'shopping'
  | 'brand'
  | 'light'
  | 'dark';

type Props = {|
  /**
   * Label for screen readers to announce Icon.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/icon#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string,
  /**
   * These are all the colors available to apply to the Icon. However, the literal options ("blue" , "darkGray" , "eggplant" , "gray" , "green" , "lightGray" , "maroon" , "midnight" , "navy" , "olive" , "orange" , "orchid" , "pine" , "purple" , "red" , "watermelon" and "white") will be deprecated soon. Avoid using them in any new implementations.
   *
   * See the [color variant](https://gestalt.pinterest.systems/icon#Colors) to learn more.
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

const IconNames: $ReadOnlyArray<$Keys<typeof icons>> = Object.keys(icons);

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
 * [Icons](https://gestalt.pinterest.systems/icon) are the symbolic representation of an action or information, providing visual context and improving usability.
 *
 * See the [Iconography and SVG guidelines](https://gestalt.pinterest.systems/iconography_and_svgs) to explore the full icon library.
 *
 * ![Icon light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Icon-list%20%230.png)
 * ![Icon dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Icon-list-dark%20%230.png)
 *
 */
export default function Icon({
  accessibilityLabel,
  color = 'gray',
  dangerouslySetSvgPath,
  icon,
  inline = false,
  size = 16,
}: Props): Node {
  let colorClass = null;
  const colorName = semanticColors.includes(color) ? `${color}Icon` : color;
  if (
    colorName !== 'dark' &&
    colorName !== 'error' &&
    colorName !== 'light' &&
    colorName !== 'subtle' &&
    colorName !== 'success' &&
    colorName !== 'warning' &&
    colorName !== 'brand'
  ) {
    colorClass = colors[colorName];
  }

  const cs = classnames(
    flipOnRtlIconNames.includes(icon) && styles.rtlSupport,
    styles.icon,
    colorClass,
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
