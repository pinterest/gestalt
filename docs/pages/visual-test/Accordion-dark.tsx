import { ColorSchemeProvider, DesignTokensProvider } from 'gestalt';
import ModuleVisualTest from './Accordion';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <ModuleVisualTest />
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
