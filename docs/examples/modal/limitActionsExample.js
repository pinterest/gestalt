// @flow strict
import React, { type Node } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Flex, Layer, Modal, Text } from 'gestalt';

function ModalWithSubHeading({ onDismiss }: {| onDismiss: () => void |}) {
  return (
    <Modal
      accessibilityModalLabel="Resume account creation"
      heading="Resume your work?"
      subHeading="Welcome back to the business account creation process!"
      align="start"
      onDismiss={onDismiss}
      footer={
        <Flex alignItems="center" justifyContent="end" gap={2}>
          <Button text="Cancel" onClick={onDismiss} />
          <Button color="red" text="Resume" />
        </Flex>
      }
      size="sm"
    >
      <Box paddingX={8}>
        <Text>
          Want to continue where you left off? Click &quot;Resume&quot; to continue creating your
          account or &quot;Cancel&quot; to start over.
        </Text>
      </Box>
    </Modal>
  );
}

export default function SubHeadingExample(): Node {
  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8}>
      <Button text="View Modal" onClick={() => setShouldShow(true)} />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithSubHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </Box>
  );
}
