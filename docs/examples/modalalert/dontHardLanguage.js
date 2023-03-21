// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DontHardLanguage(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        accessibilityModalLabel="Cancel order"
        heading="Are you sure?"
        primaryAction={{
          accessibilityLabel: 'Confirm cancel order',
          label: 'Cancel',
          onClick: () => {},
        }}
        secondaryAction={{
          accessibilityLabel: 'Keep current order',
          label: 'Cancel',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>
          There&apos;s only a few left in stock, and you may miss out on a bargain if you cancel.
          You may also incur unwanted fees.
        </Text>
      </ModalAlert>
    </Layer>
  );
}
