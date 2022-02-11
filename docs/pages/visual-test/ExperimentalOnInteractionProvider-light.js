// @flow strict
import type { Node } from 'react';
import { ExperimentalOnInteractionProvider, ColorSchemeProvider } from 'gestalt';

export default function ExperimentalOnInteractionProviderSpec(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <ExperimentalOnInteractionProvider />
    </ColorSchemeProvider>
  );
}
