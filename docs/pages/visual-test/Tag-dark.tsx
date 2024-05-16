import { ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import TagVisualSnapshot from './Tag';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TagVisualSnapshot />
    </ColorSchemeProvider>
  );
}
