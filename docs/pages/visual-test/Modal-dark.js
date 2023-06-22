// @flow strict
import { type Node } from 'react';
import { Box, Button, ColorSchemeProvider, Flex, Modal, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" width={360} height={360} padding={1}>
        <Modal
          accessibilityModalLabel="Label"
          align="start"
          heading="Heading"
          footer={
            <Flex alignItems="center" justifyContent="end" gap={2}>
              <Button text="Cancel" onClick={() => {}} />
              <Button color="red" text="Resume" />
            </Flex>
          }
          onDismiss={() => {}}
          size="sm"
          subHeading="Subheading"
        >
          <Text>Text</Text>
        </Modal>
      </Box>
    </ColorSchemeProvider>
  );
}
