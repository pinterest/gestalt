// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, IconButtonFloating } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={4}>
        <IconButtonFloating
          accessibilityLabel="test"
          accessibilityPopupRole="menu"
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
