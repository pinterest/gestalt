// @ts-expect-error - ComponentName is just an example. Replace it with the actual component name.
import { ColorSchemeProvider, ComponentName } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ComponentName />
    </ColorSchemeProvider>
  );
}
