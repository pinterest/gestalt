import { Fragment, ReactNode, useState } from 'react';
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
            accessibilityModalLabel="Delete current Pin draft confirmation"
            heading="Delete this draft?"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Delete draft',
              label: 'Delete',
              onClick: () => {},
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel, keep editing',
              label: 'Return to editing',
              onClick: () => {},
              role: 'button',
            }}
          >
            <Text>Deleting this draft cannot be undone. Are you sure you want to delete?</Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
