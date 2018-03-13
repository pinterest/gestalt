// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';

type Props = {|
  children?: React.Node,
|};

export default function Container(props: Props) {
  const { children } = props;
  return (
    <Box justifyContent="center" display="flex">
      <Box maxWidth={800} width="100%">
        {children}
      </Box>
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
