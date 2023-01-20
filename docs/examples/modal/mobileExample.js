// @flow strict
import React, { type Node } from 'react';
import { Flex, Layer, Modal, Box, Text, DeviceTypeProvider, Button } from 'gestalt';

export default function Example(): Node {
  const [showModal, setShowModal] = React.useState(false);

  return showModal ? (
    <DeviceTypeProvider deviceType="mobile">
      <Layer>
        <Modal
          align="center"
          accessibilityModalLabel="Mobile Modal example"
          heading="Heading"
          subHeading="SubHeading"
          onDismiss={() => setShowModal(false)}
          footer={
            <Flex justifyContent="center" gap={2}>
              <Button color="gray" text="Secondary" />
              <Button color="red" text="Primary" />
            </Flex>
          }
          size="lg"
        >
          <Box>{Array(100).fill(<Text>Content</Text>)}</Box>
        </Modal>
      </Layer>
    </DeviceTypeProvider>
  ) : (
    <Box padding={2}>
      <Button
        accessibilityLabel="Show Modal"
        color="red"
        text="Show Modal"
        size="lg"
        onClick={() => setShowModal(true)}
      />
    </Box>
  );
}
