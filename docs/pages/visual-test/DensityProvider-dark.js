// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, DensityProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DensityProvider />
    </ColorSchemeProvider>
  );
}
