// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import SegmentedControlSnapshot from './SegmentedControl';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <SegmentedControlSnapshot />
    </ColorSchemeProvider>
  );
}
