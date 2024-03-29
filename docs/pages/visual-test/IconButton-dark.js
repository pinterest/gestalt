// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, IconButton } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <IconButton
          accessibilityLabel="IconButton"
          bgColor="lightGray"
          icon="visit"
          iconColor="darkGray"
          size="md"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
