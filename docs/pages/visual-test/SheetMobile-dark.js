// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider, DeviceTypeProvider, SheetMobile } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="Heading" subHeading="SubHeading" onDismiss={() => {}} />
      </DeviceTypeProvider>
    </ColorSchemeProvider>
  );
}
