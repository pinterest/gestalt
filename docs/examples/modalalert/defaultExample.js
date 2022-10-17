// @flow strict
import { type Node, useState } from 'react';
import { ModalAlert, Box, Button, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DefaultExample(): Node {
  const [showModal, setShowModal] = useState(true);

  return (
    <Box>
      <Button
        text="show modal"
        onClick={() => {
          setShowModal((currVal) => !currVal);
        }}
      />
      {showModal && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete board 70s Furniture"
            heading="Delete this board"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
            }}
            onDismiss={() => {
              setShowModal((currVal) => !currVal);
            }}
          >
            <Text>
              Your board and all of its Pins will be deleted forever. Other Pinners who have access
              to this board will also lose access. This cannot be undone.
            </Text>
          </ModalAlert>
        </Layer>
      )}
    </Box>
  );
}
