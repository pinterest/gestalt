import { ColorSchemeProvider, DesignTokensProvider } from 'gestalt';
import TagVisualSnapshot from './Tag';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <TagVisualSnapshot />
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
