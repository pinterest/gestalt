// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoClearCommunicate(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        type="error"
        accessibilityModalLabel="Delete board 70s Furniture"
        heading="Your credit card has expired"
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>
          The card we have on file is no longer valid. Update it to continue running campaigns.
        </Text>
      </ModalAlert>
    </Layer>
  );
}
