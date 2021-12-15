// @flow strict
import type { Node } from 'react';
import Box from './Box.js';

type Props = {|
  children?: Node,
|};

/**
 * [Containers](https://gestalt.pinterest.systems/container ) are useful in responsively laying out content on different screens.
 */
export default function Container(props: Props): Node {
  const { children } = props;
  return (
    <Box justifyContent="center" display="flex">
      <Box maxWidth={800} width="100%">
        {children}
      </Box>
    </Box>
  );
}
