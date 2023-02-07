// @flow strict
import { type Node } from 'react';
import { PopoverTwo, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <PopoverTwo />
    </ColorSchemeProvider>
  );
}
