// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function WarningMultiAction(): Node {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowModal(true)}
        />
      </Box>
      {showModal ? (
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
              We aren&apos;t sure of the contents of this site and can&apos;t verify that you will
              find what you are looking for. Are you sure you want to continue?
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
