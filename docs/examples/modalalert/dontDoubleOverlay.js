// @flow strict
import { type Node, useState } from 'react';
import { ModalAlert, Box, Button, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoOverlayPage(): Node {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);

  return (
    <Box padding={3}>
      <Button
        text="Show modal"
        onClick={() => {
          setShowModalA(true);
          setShowModalB(true);
        }}
      />
      {showModalA && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Promote to admin"
            heading="Promote to admin"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Submit',
              onClick: () => setShowModalA(false),
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'Cancel',
              onClick: () => setShowModalA(false),
            }}
            onDismiss={() => setShowModalA(false)}
          >
            <Box height={300}>
              <Text>
                Your board and all of its Pins will be deleted forever. Other Pinners who have
                access to this board will also lose access. This cannot be undone.
              </Text>
            </Box>
          </ModalAlert>
        </Layer>
      )}
      {showModalB && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete board 70s Furniture"
            heading="Delete this board?"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
              onClick: () => setShowModalB(false),
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => setShowModalB(false),
            }}
            onDismiss={() => {
              setShowModalB(false);
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
