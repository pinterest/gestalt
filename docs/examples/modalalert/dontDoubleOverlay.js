// @flow strict
import { type Node, useState } from 'react';
import { ModalAlert, Box, Button, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoOverlayPage(): Node {
  const [showModal, setShowModal] = useState(true);

  return (
    <Box padding={3}>
      <Button
        text="Show modal"
        onClick={() => {
          setShowModal((currVal) => !currVal);
        }}
      />
      <Layer zIndex={zIndex}>
        <ModalAlert
          accessibilityModalLabel="Delete board 70s Furniture"
          heading="Promote to admin"
          primaryAction={{
            accessibilityLabel: 'Confirm delete board',
            label: 'Submit',
            onClick: () => {},
          }}
          secondaryAction={{
            accessibilityLabel: 'Cancel board deletion',
            label: 'Cancel',
            onClick: () => {},
          }}
          onDismiss={() => {}}
        >
          <Box height={300}>
            <Text>
              Your board and all of its Pins will be deleted forever. Other Pinners who have access
              to this board will also lose access. This cannot be undone.
            </Text>
          </Box>
        </ModalAlert>
      </Layer>
      {showModal && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete board 70s Furniture"
            heading="Delete this board"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => {},
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
