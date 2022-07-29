// @flow strict
import React, { type Node } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Flex, Layer, Modal, Text } from 'gestalt';

export default function AccessibilityExample(): Node {
  const [showModal, setShowModal] = React.useState(false);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Delete board 60s Furniture"
        heading="Are you sure?"
        onDismiss={() => {
          setShowModal(!showModal);
        }}
        footer={
          <Flex justifyContent="end" gap={2}>
            <Button color="gray" text="Cancel" />
            <Button color="red" text="Delete forever" />
          </Flex>
        }
        size="sm"
      >
        <Box padding={8}>
          <Text align="center" size="300">
            Once you delete a board and all its Pins, you can&apos;t undo it!
          </Text>
        </Box>
      </Modal>
    </Layer>
  );
}
