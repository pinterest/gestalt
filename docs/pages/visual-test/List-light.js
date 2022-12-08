// @flow strict
import { type Node } from 'react';
import { List, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <List />
    </ColorSchemeProvider>
  );
}
