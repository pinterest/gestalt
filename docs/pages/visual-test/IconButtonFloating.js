// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, IconButtonFloating, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
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
