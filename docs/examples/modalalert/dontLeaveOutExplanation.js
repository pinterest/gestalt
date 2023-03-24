// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoClearCommunicate(): Node {
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
            accessibilityModalLabel="Unable to follow account"
            heading="You can't follow this person"
            primaryAction={{
              accessibilityLabel: '',
              label: 'Got it',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Text>Try again later.</Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
