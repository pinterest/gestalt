// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, SheetMobile } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <SheetMobile heading="test" onDismiss={() => {}} />
    </ColorSchemeProvider>
  );
}
