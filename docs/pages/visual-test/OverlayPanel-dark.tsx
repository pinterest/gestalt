import {
  Box,
  Button,
  ColorSchemeProvider,
  DesignTokensProvider,
  Flex,
  OverlayPanel,
  Text,
} from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" height={360} padding={1} width={360}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Test"
            accessibilityLabel="Test"
            footer={
              <Flex justifyContent="end">
                <Button color="red" text="Submit" />
              </Flex>
            }
            heading="Heading"
            onDismiss={() => {}}
            size="sm"
          >
            <Text>Children</Text>
          </OverlayPanel>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
