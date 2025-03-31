import { Box, ColorSchemeProvider, DesignTokensProvider, ModalAlert, Text } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <DesignTokensProvider>
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
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
