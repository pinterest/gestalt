// @flow strict
import { Children, type Node } from 'react';
import Box from './Box.js';

type Props = {|
  /**
   * One or more Buttons and/or IconButtons.
   */
  children?: Node,
|};

/**
 * [ButtonGroup](https://gestalt.pinterest.systems/web/buttongroup) is used to display a series of buttons.
 *
 * ![ButtonGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup.spec.mjs-snapshots/ButtonGroup-chromium-darwin.png)
 * ![ButtonGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup-dark.spec.mjs-snapshots/ButtonGroup-dark-chromium-darwin.png)
 *
 */
function ButtonGroup({ children }: Props): Node {
  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <Box margin={-1} display="flex" wrap>
      {Children.map(children, (child) =>
        // $FlowFixMe[incompatible-type]
        child !== null && child !== undefined ? <Box padding={1}>{child}</Box> : null,
      )}
    </Box>
  );
}

export default ButtonGroup;
