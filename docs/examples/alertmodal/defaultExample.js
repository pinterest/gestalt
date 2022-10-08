// @flow strict
import React, { type Node } from 'react';
import { AlertModal, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

export default function DefaultExample(): Node {
  const [showModal, setShowModal] = React.useState(false);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Layer zIndex={zIndex}>
      <AlertModal
        accessibilityModalLabel="Delete board 70s Furniture"
        heading="Delete this board"
        primaryAction={{
          accessibilityLabel: 'Confirm delete board',
          label: 'Yes, delete',
        }}
        secondaryAction={{
          accessibilityLabel: 'Cancel board deletion',
          label: 'No, keep',
        }}
        onDismiss={() => {
          setShowModal(!showModal);
        }}
      >
        <Text>
          Your board and all of its Pins will be deleted forever. Other Pinners who have access to
          this board will also lose access. This cannot be undone.
        </Text>
      </AlertModal>
    </Layer>
  );
}
