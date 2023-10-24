// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import SegmentedControlSnapshot from './SegmentedControl.js';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <SegmentedControlSnapshot />
    </ColorSchemeProvider>
  );
}
