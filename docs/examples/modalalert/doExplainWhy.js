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
        accessibilityModalLabel="Delete board 70s Furniture"
        heading="Follower limit reached"
        primaryAction={{
          accessibilityLabel: '',
          label: 'Got it',
          href: 'https://www.pinterest.com',
        }}
        onDismiss={() => {}}
      >
        <Text>
          You&apos;ve hit a spam block and can&apos;t follow any more people right now. Try again
          later.
        </Text>
      </ModalAlert>
    </Layer>
  );
}
