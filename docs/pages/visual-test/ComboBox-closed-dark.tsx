import { ColorSchemeProvider, DesignTokensProvider } from 'gestalt';
import ComboBoxClosedSnapshot from './ComboBox-closed';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <ComboBoxClosedSnapshot />
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
