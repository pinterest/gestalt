import { $Keys } from 'utility-types';
import type { Node } from 'react';
import 'react';
import icons from './icons/index';
export declare type IconColor =
  | 'default'
  | 'subtle'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'recommendation'
  | 'inverse'
  | 'shopping'
  | 'brandPrimary'
  | 'light'
  | 'dark';
declare type Props = {
  /**
   * Label for screen readers to announce Icon.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/icon#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string;
  /**
   * These are all the colors available to apply to the Icon. However, the literal options ("blue" , "darkGray" , "eggplant" , "gray" , "green" , "lightGray" , "maroon" , "midnight" , "navy" , "olive" , "orange" , "orchid" , "pine" , "purple" , "red" , "watermelon" and "white") will be deprecated soon. Avoid using them in any new implementations.
   *
   * See the [color variant](https://gestalt.pinterest.systems/web/icon#Colors) to learn more.
   */
  color?: IconColor;
  /**
   * SVG icon from the Gestalt icon library to use within Icon..
   *
   * See the [iconography and SVG](https://gestalt.pinterest.systems/foundations/iconography/library) guidelines to explore the Gestalt icon library.
   */
  icon?: $Keys<typeof icons>;
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   *
   * See the [custom icon](https://gestalt.pinterest.systems/web/icon#Custom-icon) variant to learn more.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * Properly positions Icon relative to an inline element, such as Text using the inline property.
   */
  inline?: boolean;
  /**
   * Use a number for pixel sizes or a string for percentage based sizes.
   *
   * See the [size](https://gestalt.pinterest.systems/web/icon#Size) variant to learn more.
   */
  size?: number | string;
};
/**
 * [Icons](https://gestalt.pinterest.systems/web/icon) are the symbolic representation of an action or information, providing visual context and improving usability.
 *
 * See the [Iconography and SVG guidelines](https://gestalt.pinterest.systems/foundations/iconography/library) to explore the full icon library.
 *
 * ![Icon light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list.spec.mjs-snapshots/Icon-list-chromium-darwin.png)
 * ![Icon dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list-dark.spec.mjs-snapshots/Icon-list-dark-chromium-darwin.png)
 *
 */
declare function Icon({
  accessibilityLabel,
  color,
  dangerouslySetSvgPath,
  icon,
  inline,
  size,
}: Props): Node;
declare namespace Icon {
  var icons: readonly any[];
  var displayName: string;
}
export default Icon;
