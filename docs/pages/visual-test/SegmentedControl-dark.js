// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, SegmentedControl } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1} width={200}>
        <SegmentedControl items={['Boards', 'Pins']} selectedItemIndex={0} onChange={() => {}} />
      </Box>
    </ColorSchemeProvider>
  );
}
