// @flow strict
import { type Node } from 'react';
import { Box, IconButton, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <IconButton
          accessibilityLabel="IconButton"
          icon="visit"
          bgColor="lightGray"
          iconColor="darkGray"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
