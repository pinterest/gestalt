// @flow strict
import { type Node } from 'react';
import { TagData, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <TagData />
    </ColorSchemeProvider>
  );
}
