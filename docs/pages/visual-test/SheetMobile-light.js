// @flow strict
import { type Node } from 'react';
import { SheetMobile, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <SheetMobile />
    </ColorSchemeProvider>
  );
}
