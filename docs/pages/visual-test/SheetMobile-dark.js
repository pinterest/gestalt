// @flow strict
import { type Node } from 'react';
import { SheetMobile, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <SheetMobile heading="test" onDismiss={() => {}} />
    </ColorSchemeProvider>
  );
}
