// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';

type Props = {|
  children?: React.Node,
  maxWidth?: number,
|};

export default function Container({ children, maxWidth }: Props) {
  return (
    <Box justifyContent="center" display="flex">
      <Box maxWidth={maxWidth ?? 800} width="100%">
        {children}
      </Box>
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.number,
};
