// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, ColorSchemeProvider, DeviceTypeProvider, Flex, Modal, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <DeviceTypeProvider deviceType="mobile">
      <ColorSchemeProvider colorScheme="light">
        <Box color="default" display="inlineBlock" height={360} padding={1} width={360}>
          <Modal
            accessibilityModalLabel="Label"
            align="start"
            footer={
              <Flex alignItems="center" gap={2} justifyContent="end">
                <Button onClick={() => {}} text="Cancel" />
                <Button color="red" text="Resume" />
              </Flex>
            }
            heading="Heading"
            onDismiss={() => {}}
            size="sm"
            subHeading="Subheading"
          >
            <Text>Text</Text>
          </Modal>
        </Box>
      </ColorSchemeProvider>
    </DeviceTypeProvider>
  );
}
