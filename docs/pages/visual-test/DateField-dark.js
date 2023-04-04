// @flow strict
import { type Node } from 'react';
import { DateField, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DateField />
    </ColorSchemeProvider>
  );
}
