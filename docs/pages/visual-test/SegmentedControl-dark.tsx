import { ColorSchemeProvider, DesignTokensProvider } from 'gestalt';
import SegmentedControlSnapshot from './SegmentedControl';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <SegmentedControlSnapshot />
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
