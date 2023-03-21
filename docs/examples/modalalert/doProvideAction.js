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
        accessibilityModalLabel="Unable to charge credit card"
        heading="Your credit card has expired"
        primaryAction={{
          accessibilityLabel: 'Update credit card info',
          label: 'Update credit card',
          href: 'https://www.pinterest.com',
        }}
        secondaryAction={{
          accessibilityLabel: 'Cancel',
          label: 'Cancel',
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
