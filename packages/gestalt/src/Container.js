// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';

type Props = {|
  children?: Node,
|};

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

Container.propTypes = {
  children: PropTypes.node,
};
