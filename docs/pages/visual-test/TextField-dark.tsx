import { ColorSchemeProvider, DesignTokensProvider } from 'gestalt';
import TextFieldScreenshot from './TextField';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <TextFieldScreenshot />
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
