// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import TagVisualSnapshot from './Tag.js';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TagVisualSnapshot />
    </ColorSchemeProvider>
  );
}
