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
            accessibilityModalLabel="Unable to follow more people"
            heading="Follower limit reached"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: '',
              label: 'Got it',
              onClick: () => {},
              role: 'button',
            }}
            type="warning"
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
