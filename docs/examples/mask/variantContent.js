// @flow strict
import { type Node } from 'react';
import { Box, Flex, Mask } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box maxWidth={300}>
        <Mask rounding="circle">
          <img
            alt="weakendclub.com"
            src="https://i.ibb.co/121JJzC/stock7.jpg"
            style={{ maxWidth: '100%', display: 'block' }}
          />
        </Mask>
      </Box>
    </Flex>
  );
}
