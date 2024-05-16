import { ReactNode, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Flex, Layer, Modal, Text } from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8}>
      <Button onClick={() => setShowComponent(true)} text="View Modal" />
      {showComponent && (
        <Layer zIndex={modalZIndex}>
          <Modal
            accessibilityModalLabel="Resume account creation"
            align="start"
            footer={
              <Flex alignItems="center" gap={2} justifyContent="end">
                <Button onClick={() => setShowComponent(false)} text="Cancel" />
                <Button color="red" text="Resume" />
              </Flex>
            }
            heading="Resume your work?"
            onDismiss={() => setShowComponent(false)}
            size="sm"
            subHeading="Welcome back to the business account creation process!"
          >
            <Text>
              Want to continue where you left off? Click &quot;Resume&quot; to continue creating
              your account or &quot;Cancel&quot; to start over.
            </Text>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}
