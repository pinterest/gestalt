// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import TextFieldScreenshot from './TextField.js';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TextFieldScreenshot />
    </ColorSchemeProvider>
  );
}
