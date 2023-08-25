// @flow strict-local
import { type Node } from 'react';
import { Box } from 'gestalt';

type Props = {|
  color: string,
|};

/**
 * [ReferenceArea](https://gestalt.pinterest.systems/web/chart) component should be used for ... on the page.
 */

function Marker({ color }: Props): Node {
  return (
    <Box>
      <svg width="10" height="10">
        <rect style={{ fill: color }} height="10" width="10" />
      </svg>
    </Box>
  );
}

export default Marker;
