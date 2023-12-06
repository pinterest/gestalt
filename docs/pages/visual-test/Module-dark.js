// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import ModuleVisualTest from './Module';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ModuleVisualTest />
    </ColorSchemeProvider>
  );
}
