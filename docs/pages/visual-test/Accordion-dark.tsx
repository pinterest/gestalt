import {ReactNode} from 'react';
import { ColorSchemeProvider } from 'gestalt';
import ModuleVisualTest from './Accordion';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ModuleVisualTest />
    </ColorSchemeProvider>
  );
}
