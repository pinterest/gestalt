// @flow strict
import { type Node } from 'react';
import { Badge, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box display="inlineBlock" padding={1}>
        <Badge text="Try it out!" />
        <Badge text="Try it out!" type="success" />
        <Badge text="Try it out!" type="error" />
        <Badge text="Try it out!" type="warning" />
        <Badge text="Try it out!" type="neutral" />
        <Badge text="Try it out!" type="lightWash" />
        <Badge text="Try it out!" type="darkWash" />
      </Box>
    </ColorSchemeProvider>
  );
}
