import {Fragment, ReactNode, useState} from 'react';
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
            accessibilityModalLabel="Unable to follow account"
            heading="You can't follow this person"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: '',
              label: 'Got it',
              onClick: () => {},
              role: 'button',
            }}
            type="warning"
          >
            <Text>Try again later.</Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
