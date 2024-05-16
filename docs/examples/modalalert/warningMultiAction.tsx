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
            accessibilityModalLabel="Spam link warning"
            heading="This site may lead to spam"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Continue to Pin site',
              label: 'Continue to site',
              href: 'https://www.google.com',
              role: 'link',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel navigation to site',
              label: 'Cancel',
              onClick: () => {},
              role: 'button',
            }}
            type="warning"
          >
            <Text>
              We aren&apos;t sure of the contents of this site and can&apos;t verify that you will
              find what you are looking for. Are you sure you want to continue?
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
