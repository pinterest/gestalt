// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);

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
              role: 'button',
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
