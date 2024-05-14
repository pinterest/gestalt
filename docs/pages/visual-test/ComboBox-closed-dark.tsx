import { ColorSchemeProvider } from 'gestalt';
import ComboBoxClosedSnapshot from './ComboBox-closed';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ComboBoxClosedSnapshot />
    </ColorSchemeProvider>
  );
}
