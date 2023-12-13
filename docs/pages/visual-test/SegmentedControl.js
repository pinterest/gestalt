// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, SegmentedControl } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1} width={200}>
        <SegmentedControl items={['Boards', 'Pins']} selectedItemIndex={0} onChange={() => {}} />
      </Box>
    </ColorSchemeProvider>
  );
}
