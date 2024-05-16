import {ReactNode} from 'react';
import { ColorSchemeProvider, DeviceTypeProvider, SheetMobile } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="Heading" onDismiss={() => {}} subHeading="SubHeading" />
      </DeviceTypeProvider>
    </ColorSchemeProvider>
  );
}
