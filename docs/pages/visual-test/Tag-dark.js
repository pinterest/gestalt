// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import TagVisualSnapshot from './Tag';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TagVisualSnapshot />
    </ColorSchemeProvider>
  );
}
