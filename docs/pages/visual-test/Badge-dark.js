// @flow strict
import { type Node } from 'react';
import { Badge, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Badge text="Try it out!" />
      </Box>
    </ColorSchemeProvider>
  );
}
