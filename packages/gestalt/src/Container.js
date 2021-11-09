// @flow strict
import type { Node } from 'react';
import Box from './Box.js';

type Props = {|
  children?: Node,
|};

/**
 * https://gestalt.pinterest.systems/container
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
