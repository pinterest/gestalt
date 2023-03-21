// @flow strict
import { type Node } from 'react';
import { Box, Flex, IconButton, Pulsar } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box position="relative">
        <IconButton accessibilityLabel="Example icon button" icon="filter" />

        <Box position="absolute" top margin={-5}>
          <Pulsar size={88} />
        </Box>
      </Box>
    </Flex>
  );
}
