// @flow strict
import { type Node } from 'react';
import { ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function ErrorMultiAction(): Node {
  return (
    <Layer zIndex={zIndex}>
      <ModalAlert
        type="error"
        accessibilityModalLabel="API access revoked error"
        heading="Your API access has been revoked"
        primaryAction={{
          accessibilityLabel: 'Submit appeal to Pinterest',
          label: 'Submit an appeal',
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
          You will not be able to make any API calls or create new apps. Pinterest Developers{' '}
          functionality will be limited to read-only data until you submit an appeal.
        </Text>
      </ModalAlert>
    </Layer>
  );
}
