import type { Node } from 'react';
import 'react';
type StatusType = 'unstarted' | 'inProgress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning';
type Props = {
  /**
   * If not using `title`, provide an accessibility label to give the user context about the icon. Be sure to [localize](https://gestalt.pinterest.systems/web/status#Localization) the label.
   */
  accessibilityLabel?: string;
  /**
   * Additional contextual information around the status. Only for use with `title`. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
   */
  subtext?: string;
  /**
   * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
   */
  title?: string;
  /**
   * The type of status to display.
   */
  type: StatusType;
};
/**
 * [Status](https://gestalt.pinterest.systems/web/status) is a graphic indicator of an element’s state.
 *
 * ![Status light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status.spec.mjs-snapshots/Status-chromium-darwin.png)
 * ![Status dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status-dark.spec.mjs-snapshots/Status-dark-chromium-darwin.png)
 *
 */
export default function Status({ accessibilityLabel, subtext, title, type }: Props): Node;
export {};
