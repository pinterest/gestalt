// @flow strict

import { type Node } from 'react';
import { useAnimation } from './animation/AnimationContext.js';

/**
 * Use List.Item to build lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#List.Item).
 */
type Props = {|
  children: ({| onDismissStart: () => void |}) => Node,
|};

/**
 * [DismissingElement](https://gestalt.pinterest.systems/web/overlaypanel) allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Popover](https://gestalt.pinterest.systems/web/popover).
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.mjs-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 *
 */
const DismissingElement = ({ children }: Props): Node => {
  const { onExternalDismiss } = useAnimation();

  return children({ onDismissStart: onExternalDismiss });
};

DismissingElement.displayName = 'DismissingElement';

export default DismissingElement;
