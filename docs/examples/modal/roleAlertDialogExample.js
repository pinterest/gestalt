// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

export default function AlertDialogAccessibilityExample(): Node {
  const [showComponent, setShowComponent] = useState(true);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
      {showComponent ? (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete 70s couch item"
            heading="Remove this item?"
            primaryAction={{
              accessibilityLabel: 'Remove item',
              label: 'Yes, remove',
              onClick: () => {},
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Keep item',
              label: 'No, keep',
              onClick: () => {},
              role: 'button',
            }}
            onDismiss={() => {
              setShowComponent(!showComponent);
            }}
          >
            <Text>
              This item and all of its related metadata will be removed from your Catalogs
              permanently. This cannot be undone.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
