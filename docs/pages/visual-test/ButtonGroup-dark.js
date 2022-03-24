// @flow strict
import { type Node } from 'react';
import { Box, Button, ButtonGroup, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <ButtonGroup>
          <Button text="Button 1" />
          <Button text="Button 2" />
        </ButtonGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
