// @flow strict
import type { Node } from 'react';

import { Children, Fragment } from 'react';
import Box from './Box.js';

/**
 * https://gestalt.pinterest.systems/ButtonGroup
 */
function ButtonGroup({ children }: {| children?: Node |}): Node {
  const count = Children.count(children);

  if (count === 0) {
    return null;
  }
  if (count === 1) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Box marginStart={-1} marginEnd={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
      {Children.map(children, (child) =>
        child !== null && child !== undefined ? (
          <Box paddingX={1} paddingY={1}>
            {child}
          </Box>
        ) : null,
      )}
    </Box>
  );
}

export default ButtonGroup;
