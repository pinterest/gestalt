// @flow strict
import { type Node } from 'react';
import Box from './Box.js';

type Props = {|
  /**
   *
   */
  children?: Node,
|};

/**
 * [Containers](https://gestalt.pinterest.systems/container ) are useful in responsively laying out content on different screens.
 *
 * ![Container light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Container%20%230.png)
 *
 */
export default function Container({ children }: Props): Node {
  return (
    <Box justifyContent="center" display="flex">
      <Box maxWidth={800} width="100%">
        {children}
      </Box>
    </Box>
  );
}
