import { ColorSchemeProvider } from 'gestalt';
import SegmentedControlSnapshot from './SegmentedControl';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <SegmentedControlSnapshot />
    </ColorSchemeProvider>
  );
}
