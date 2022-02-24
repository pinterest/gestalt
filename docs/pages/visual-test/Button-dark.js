// @flow strict
import { type Node } from 'react';
import { Box, Button, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Button color="gray" text="Save a Pin" />
      </Box>
    </ColorSchemeProvider>
  );
}
