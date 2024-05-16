import { Fragment, useState } from 'react';
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
            accessibilityModalLabel="Cancel clothing order"
            heading="Do you really want to cancel your order?"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Confirm cancel order',
              label: 'Yes, cancel',
              onClick: () => {},
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Keep current order',
              label: 'No, keep',
              onClick: () => {},
              role: 'button',
            }}
          >
            <Text>
              There&apos;s only a few left in stock, and you may miss out on a bargain if you
              cancel. You may also incur unwanted fees.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
