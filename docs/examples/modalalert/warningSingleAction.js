// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function WarningSingleAction(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        type="warning"
        accessibilityModalLabel="Unable to follow more people"
        heading="Follower limit reached"
        primaryAction={{
          accessibilityLabel: '',
          label: 'Got it',
          onClick: () => {},
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
