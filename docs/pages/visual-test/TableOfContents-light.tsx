import {ReactNode} from 'react';
import { Box, ColorSchemeProvider, TableOfContents } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={2} width={300}>
        <TableOfContents title="Page Contents">
          <TableOfContents.Item active href="#section-1" label="Section 1" />
          <TableOfContents.Item active={false} href="#section-2" label="Section 2" />
          <TableOfContents.Item active={false} href="#section-3" label="Section 3" />
        </TableOfContents>
      </Box>
    </ColorSchemeProvider>
  );
}
