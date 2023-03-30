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
            accessibilityModalLabel="Unable to follow more people"
            heading="Follower limit reached"
            primaryAction={{
              accessibilityLabel: '',
              label: 'Got it',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Text>
              You&apos;ve hit a spam block and can&apos;t follow any more people right now. Try
              again later.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
