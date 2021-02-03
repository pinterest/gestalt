// @flow strict
import React, { Children, Fragment, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';

function ButtonGroup({ children }: {| children?: Node |}): Node {
  const count = Children.count(children);

  if (count === 0) {
    return null;
  }
  if (count === 1) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Box marginStart={-1} marginRight={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
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

ButtonGroup.propTypes = {
  children: PropTypes.node,
};

export default ButtonGroup;
