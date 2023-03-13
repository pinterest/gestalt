import type { Node } from 'react';
import 'react';
declare type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label.
   */
  accessibilityLabel: string;
  /**
   * Color of the Spinner.
   */
  color?: 'default' | 'subtle';
  /**
   * Whether or not to render with a 300ms delay. The delay is for perceived performance, so you should rarely need to remove it. See the [delay variant](https://gestalt.pinterest.systems/web/spinner#Delay) for more details.
   */
  delay?: boolean;
  /**
   * Indicates if Spinner should be visible.
   */
  show: boolean;
  /**
   * sm: 32px, md: 40px
   */
  size?: 'sm' | 'md';
};
/**
 * [Spinner](https://gestalt.pinterest.systems/web/spinner ) helps indicate that a surface's content or portion of content is currently loading.
 *
 * ![Spinner](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/general/Spinner.svg)
 *
 */
export default function Spinner({ accessibilityLabel, color, delay, show, size }: Props): Node;
export {};
