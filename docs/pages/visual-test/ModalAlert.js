// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, ModalAlert, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
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
  );
}
