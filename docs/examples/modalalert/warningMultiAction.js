// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function WarningMultiAction(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        type="warning"
        accessibilityModalLabel="Spam link warning"
        heading="This site may lead to spam"
        primaryAction={{
          accessibilityLabel: 'Continue to Pin site',
          label: 'Continue to site',
          href: 'https://www.google.com',
        }}
        secondaryAction={{
          accessibilityLabel: 'Cancel navigation to site',
          label: 'Cancel',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>
          We aren&apos;t sure of the contents of this site and can&apos;t verify that you will find
          what you are looking for. Are you sure you want to continue?
        </Text>
      </ModalAlert>
    </Layer>
  );
}
