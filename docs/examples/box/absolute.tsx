import { ReactNode } from 'react';
import { Box, Text } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" width="100%">
      <Box color="infoBase" left padding={2} position="absolute" top>
        <Text color="light">Top Left</Text>
      </Box>
      <Box color="infoBase" padding={2} position="absolute" right top>
        <Text color="light">Top Right</Text>
      </Box>
      <Box bottom color="infoBase" left padding={2} position="absolute">
        <Text color="light">Bottom Left</Text>
      </Box>
      <Box bottom color="infoBase" padding={2} position="absolute" right>
        <Text color="light">Bottom Right</Text>
      </Box>
    </Box>
  );
}
