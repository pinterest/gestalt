import { Fragment, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show Modal"
        />
      </Box>
      {showComponent ? (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="API access revoked error"
            heading="Your API access has been revoked"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Submit appeal to Pinterest',
              label: 'Submit an appeal',
              href: 'https://www.pinterest.com',
              role: 'link',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel',
              label: 'Cancel',
              onClick: () => {},
              role: 'button',
            }}
            type="error"
          >
            <Text>
              You will not be able to make any API calls or create new apps. Pinterest Developers{' '}
              functionality will be limited to read-only data until you submit an appeal.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
