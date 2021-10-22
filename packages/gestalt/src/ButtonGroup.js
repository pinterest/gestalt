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
 * [ButtonGroup](https://gestalt.pinterest.systems/ButtonGroup) is used to display a series of buttons.
 */
function ButtonGroup({ children }: Props): Node {
  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <Box margin={-1} display="flex" wrap>
      {Children.map(children, (child) =>
        child !== null && child !== undefined ? <Box padding={1}>{child}</Box> : null,
      )}
    </Box>
  );
}

export default ButtonGroup;
