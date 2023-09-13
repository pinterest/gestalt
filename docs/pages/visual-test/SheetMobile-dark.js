// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, DeviceTypeProvider, SheetMobile } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="Heading" subHeading="SubHeading" onDismiss={() => {}} />
      </DeviceTypeProvider>
    </ColorSchemeProvider>
  );
}
