// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import TextFieldScreenshot from './TextField';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TextFieldScreenshot />
    </ColorSchemeProvider>
  );
}
