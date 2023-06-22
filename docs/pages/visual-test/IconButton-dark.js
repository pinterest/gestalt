// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, IconButton } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <IconButton
          accessibilityLabel="IconButton"
          icon="visit"
          bgColor="lightGray"
          iconColor="darkGray"
          size="md"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
