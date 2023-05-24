// @flow strict
import { type Node } from 'react';
import { TileData, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TileData />
    </ColorSchemeProvider>
  );
}
