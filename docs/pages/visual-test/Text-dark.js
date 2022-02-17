// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Text } from 'gestalt';

export default function TextSpec(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock">
        <Box padding={1}>
          <Text size="100">Text size small</Text>
        </Box>
        <Box padding={1}>
          <Text size="200">Text size medium</Text>
        </Box>
        <Box padding={1}>
          <Text size="300">Text size large</Text>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
