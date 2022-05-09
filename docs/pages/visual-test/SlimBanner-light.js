// @flow strict
import { type Node } from 'react';
import { SlimBanner, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <SlimBanner />
    </ColorSchemeProvider>
  );
}
