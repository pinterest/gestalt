// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoLimitContent(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        accessibilityModalLabel="Delete 70s couch item"
        heading="Remove this item?"
        primaryAction={{
          accessibilityLabel: 'Remove item',
          label: 'Yes, remove',
          onClick: () => {},
        }}
        secondaryAction={{
          accessibilityLabel: 'Keep item',
          label: 'No, keep',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>
          This item and all of its related metadata will be removed from your Catalogs permanently.
          This cannot be undone.
        </Text>
      </ModalAlert>
    </Layer>
  );
}
