// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import ComboBoxClosedSnapshot from './ComboBox-closed';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ComboBoxClosedSnapshot />
    </ColorSchemeProvider>
  );
}
