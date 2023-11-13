// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, IconButtonFloating } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={4}>
        <IconButtonFloating
          accessibilityPopupRole="menu"
          accessibilityLabel="test"
          icon="add"
          onClick={() => {}}
          tooltip={{
            text: 'test',
          }}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
