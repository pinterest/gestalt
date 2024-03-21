// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example(): ReactNode {
  const [showCmpA, setShowComponentA] = useState(true);
  const [showCmpB, setShowComponentB] = useState(true);

  return (
    <Box padding={3}>
      <Button
        onClick={() => {
          setShowComponentA(true);
          setShowComponentB(true);
        }}
        text="Show modal"
      />
      {showCmpA && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Promote to admin"
            heading="Promote to admin"
            onDismiss={() => setShowComponentA(false)}
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Submit',
              onClick: () => setShowComponentA(false),
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'Cancel',
              onClick: () => setShowComponentA(false),
              role: 'button',
            }}
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
      {showCmpB && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete board 70s Furniture"
            heading="Delete this board?"
            onDismiss={() => {
              setShowComponentB(false);
            }}
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
              onClick: () => setShowComponentB(false),
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => setShowComponentB(false),
              role: 'button',
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
