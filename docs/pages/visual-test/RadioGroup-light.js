// @flow strict
import { type Node } from 'react';
import { RadioGroup, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <RadioGroup />
    </ColorSchemeProvider>
  );
}
