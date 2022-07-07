// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Heading } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock">
        <Box padding={1}>
          <Heading size="100">Heading size 100</Heading>
        </Box>
        <Box padding={1}>
          <Heading size="200">Heading size 200</Heading>
        </Box>
        <Box padding={1}>
          <Heading size="300">Heading size 300</Heading>
        </Box>
        <Box padding={1}>
          <Heading size="400">Heading size 400</Heading>
        </Box>
        <Box padding={1}>
          <Heading size="500">Heading size 500</Heading>
        </Box>
        <Box padding={1}>
          <Heading size="600">Heading size 600</Heading>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
