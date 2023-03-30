// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

export default function DoClearCommunicate(): Node {
  const [showComponent, setShowComponent] = useState(false);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
      {showComponent ? (
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
