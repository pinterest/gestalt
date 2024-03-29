// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example(): ReactNode {
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
            accessibilityModalLabel="Unable to charge credit card"
            heading="Your credit card has expired"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Update credit card info',
              label: 'Update credit card',
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
              The card we have on file is no longer valid. Update it to continue running campaigns.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
