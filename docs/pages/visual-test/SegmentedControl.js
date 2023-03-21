// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, SegmentedControl, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1} width={200}>
        <SegmentedControl items={['Boards', 'Pins']} selectedItemIndex={0} onChange={() => {}} />
      </Box>
    </ColorSchemeProvider>
  );
}
