// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box height="100%" width="100%">
      <Box position="absolute" top left padding={2} color="infoBase">
        <Text color="light">Top Left</Text>
      </Box>
      <Box position="absolute" top right padding={2} color="infoBase">
        <Text color="light">Top Right</Text>
      </Box>
      <Box position="absolute" bottom left padding={2} color="infoBase">
        <Text color="light">Bottom Left</Text>
      </Box>
      <Box position="absolute" bottom right padding={2} color="infoBase">
        <Text color="light">Bottom Right</Text>
      </Box>
    </Box>
  );
}
