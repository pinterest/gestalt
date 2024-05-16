import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, DeviceTypeProvider, ModalAlert, Text } from 'gestalt';

export default function Snapshot() {
  return (
    <DeviceTypeProvider deviceType="mobile">
      <ColorSchemeProvider colorScheme="light">
        <Box color="default" display="inlineBlock" height={360} padding={1} width={360}>
          <ModalAlert
            accessibilityDismissButtonLabel="test"
            accessibilityModalLabel="Label"
            heading="Heading"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Delete',
              onClick: () => {},
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'Cancel',
              onClick: () => {},
              role: 'button',
            }}
            type="error"
          >
            <Text>Children</Text>
          </ModalAlert>
        </Box>
      </ColorSchemeProvider>
    </DeviceTypeProvider>
  );
}
