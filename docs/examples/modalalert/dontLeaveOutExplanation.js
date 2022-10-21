// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoClearCommunicate(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        type="warning"
        accessibilityModalLabel="Unable to follow account"
        heading="You can't follow this person"
        primaryAction={{
          accessibilityLabel: '',
          label: 'Got it',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>Try again later.</Text>
      </ModalAlert>
    </Layer>
  );
}
