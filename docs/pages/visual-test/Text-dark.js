// @flow strict
import type { Node } from 'react';
import { Box, ColorSchemeProvider, Text } from 'gestalt';

export default function TextSpec(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock">
        <Box padding={1}>
          <Text size="sm">Text size small</Text>
        </Box>
        <Box padding={1}>
          <Text size="md">Text size medium</Text>
        </Box>
        <Box padding={1}>
          <Text size="lg">Text size large</Text>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
