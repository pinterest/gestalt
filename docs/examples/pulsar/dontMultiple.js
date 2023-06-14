// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, Pulsar } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%" gap={4}>
      <Box position="relative">
        <Button text="Visit" />

        <Box position="absolute" top marginTop={-5} marginStart={-3}>
          <Pulsar size={80} />
        </Box>
      </Box>

      <Box position="relative">
        <Button color="red" text="Save" />

        <Box position="absolute" top marginTop={-5} marginStart={-2}>
          <Pulsar size={78} />
        </Box>
      </Box>
    </Flex>
  );
}
