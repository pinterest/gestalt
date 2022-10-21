// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Link, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function ErrorSingleAction(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        type="error"
        accessibilityModalLabel="Site blocked error"
        heading="Website blocked"
        primaryAction={{
          accessibilityLabel: 'Acknowledge site blocked',
          label: 'Got it',
          onClick: () => {},
        }}
        onDismiss={() => {}}
      >
        <Text>
          We blocked the website you are trying to reach because it contains harmful material.
          Review our{' '}
          <Link
            underline="always"
            inline
            href="https://policy.pinterest.com/en/community-guidelines"
          >
            content policy.
          </Link>
        </Text>
      </ModalAlert>
    </Layer>
  );
}
