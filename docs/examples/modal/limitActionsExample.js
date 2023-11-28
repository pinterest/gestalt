// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Flex, Layer, Modal, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8}>
      <Button text="View Modal" onClick={() => setShowComponent(true)} />
      {showComponent && (
        <Layer zIndex={modalZIndex}>
          <Modal
            accessibilityModalLabel="Resume account creation"
            align="start"
            heading="Resume your work?"
            subHeading="Welcome back to the business account creation process!"
            onDismiss={() => setShowComponent(false)}
            footer={
              <Flex alignItems="center" justifyContent="end" gap={2}>
                <Button text="Cancel" onClick={() => setShowComponent(false)} />
                <Button color="red" text="Resume" />
              </Flex>
            }
            size="sm"
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
