import {
  ColorSchemeProvider,
  DesignTokensProvider,
  DeviceTypeProvider,
  SheetMobile,
} from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <DeviceTypeProvider deviceType="mobile">
          <SheetMobile heading="Heading" onDismiss={() => {}} subHeading="SubHeading" />
        </DeviceTypeProvider>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
