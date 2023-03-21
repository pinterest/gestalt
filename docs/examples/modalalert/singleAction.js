// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function SingleAction(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        accessibilityModalLabel="Delete current Pin draft confirmation"
        heading="Delete this draft?"
        primaryAction={{
          accessibilityLabel: 'Delete draft',
          label: 'Delete',
          onClick: () => {},
        }}
        secondaryAction={{
          accessibilityLabel: 'Cancel, keep editing',
          label: 'Return to editing',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>Deleting this draft cannot be undone. Are you sure you want to delete?</Text>
      </ModalAlert>
    </Layer>
  );
}
