// @flow strict
import type { Node } from 'react';
import { ComponentName, ColorSchemeProvider } from 'gestalt';

export default function ComponentNameSpec(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ComponentName />
    </ColorSchemeProvider>
  );
}
