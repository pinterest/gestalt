import { ColorSchemeProvider } from 'gestalt';
import TextFieldScreenshot from './TextField';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <TextFieldScreenshot />
    </ColorSchemeProvider>
  );
}
