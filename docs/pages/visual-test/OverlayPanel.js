// @flow strict
import { type Node } from 'react';
import { Box, Button, ColorSchemeProvider, Flex, OverlayPanel, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" width={360} height={360} padding={1}>
        <OverlayPanel
          accessibilityDismissButtonLabel="Test"
          accessibilityLabel="Test"
          footer={
            <Flex justifyContent="end">
              <Button text="Submit" color="red" />
            </Flex>
          }
          heading="Heading"
          onDismiss={() => {}}
          size="sm"
        >
          <Text>Children</Text>
        </OverlayPanel>
      </Box>
    </ColorSchemeProvider>
  );
}
