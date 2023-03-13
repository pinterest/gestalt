import type { Node } from 'react';
declare type Props = {
  /**
   * One or more Buttons and/or IconButtons.
   */
  children?: Node;
};
/**
 * [ButtonGroup](https://gestalt.pinterest.systems/web/buttongroup) is used to display a series of buttons.
 *
 * ![ButtonGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup.spec.mjs-snapshots/ButtonGroup-chromium-darwin.png)
 * ![ButtonGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup-dark.spec.mjs-snapshots/ButtonGroup-dark-chromium-darwin.png)
 *
 */
declare function ButtonGroup({ children }: Props): Node;
export default ButtonGroup;
