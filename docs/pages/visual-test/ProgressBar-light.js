// @flow strict
import { type Node } from 'react';
import { ProgressBar, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <ProgressBar />
    </ColorSchemeProvider>
  );
}
