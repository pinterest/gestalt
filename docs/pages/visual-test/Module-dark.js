// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import ModuleVisualTest from './Module.js';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ModuleVisualTest />
    </ColorSchemeProvider>
  );
}
