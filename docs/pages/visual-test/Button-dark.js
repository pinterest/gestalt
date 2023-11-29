// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Button color="gray" text="Save a Pin" />
      </Box>
    </ColorSchemeProvider>
  );
}
