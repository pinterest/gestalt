// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, TableOfContents } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TableOfContents />
    </ColorSchemeProvider>
  );
}
