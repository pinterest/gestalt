// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, TableOfContents } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={2} width={300}>
        <TableOfContents title="Page Contents">
          <TableOfContents.Item label="Section 1" href="#section-1" active />
          <TableOfContents.Item label="Section 2" href="#section-2" active={false} />
          <TableOfContents.Item label="Section 3" href="#section-3" active={false} />
        </TableOfContents>
      </Box>
    </ColorSchemeProvider>
  );
}
