// @flow strict
import { type Node } from 'react';
import { SideNavigation, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <SideNavigation />
    </ColorSchemeProvider>
  );
}
