// @flow strict
import React, { type Node } from 'react';
import { CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

export default function AlertDialogAccessibilityExample(): Node {
  const [showModal, setShowModal] = React.useState(false);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

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
        onDismiss={() => {
          setShowModal(!showModal);
        }}
      >
        <Text>
          This item and all of its related metadata will be removed from your Catalogs permanently.
          This cannot be undone.
        </Text>
      </ModalAlert>
    </Layer>
  );
}
