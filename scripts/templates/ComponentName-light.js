// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider, ComponentName } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <ComponentName />
    </ColorSchemeProvider>
  );
}
