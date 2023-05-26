// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box />
    </ColorSchemeProvider>
  );
}
