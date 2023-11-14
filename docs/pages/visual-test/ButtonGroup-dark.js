// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, ButtonGroup, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <ButtonGroup>
          <Button text="Button 1" />
          <Button text="Button 2" />
        </ButtonGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
