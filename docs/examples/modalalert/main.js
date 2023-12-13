// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DefaultExample(): ReactNode {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <Box padding={3}>
      <Button
        text="Show modal"
        onClick={() => {
          setShowComponent(true);
        }}
      />
      {showComponent && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete board 70s Furniture"
            heading="Delete this board?"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
              onClick: () => setShowComponent(false),
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => setShowComponent(false),
              role: 'button',
            }}
            onDismiss={() => {
              setShowComponent(false);
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
