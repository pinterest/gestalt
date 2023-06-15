// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, DeviceTypeProvider, ModalAlert, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <DeviceTypeProvider deviceType="mobile">
      <ColorSchemeProvider colorScheme="light">
        <Box color="default" display="inlineBlock" width={360} height={360} padding={1}>
          <ModalAlert
            accessibilityModalLabel="Label"
            heading="Heading"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Delete',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'Cancel',
              onClick: () => {},
            }}
            onDismiss={() => {}}
            accessibilityDismissButtonLabel="test"
            type="error"
          >
            <Text>Children</Text>
          </ModalAlert>
        </Box>
      </ColorSchemeProvider>
    </DeviceTypeProvider>
  );
}
