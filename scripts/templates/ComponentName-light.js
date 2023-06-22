// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, ComponentName } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <ComponentName />
    </ColorSchemeProvider>
  );
}
