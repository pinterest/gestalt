import {Fragment, ReactNode, useState} from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show Modal"
        />
      </Box>
      {showComponent ? (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete 70s couch item"
            heading="Remove this item?"
            onDismiss={() => setShowComponent(false)}
            primaryAction={{
              accessibilityLabel: 'Remove item',
              label: 'Yes, remove',
              onClick: () => setShowComponent(false),
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Keep item',
              label: 'No, keep',
              onClick: () => setShowComponent(false),
              role: 'button',
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
