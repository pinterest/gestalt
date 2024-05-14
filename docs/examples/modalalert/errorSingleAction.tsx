import { Fragment, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, Link, ModalAlert, Text } from 'gestalt';

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
            accessibilityModalLabel="Site blocked error"
            heading="Website blocked"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Acknowledge site blocked',
              label: 'Got it',
              onClick: () => {},
              role: 'button',
            }}
            type="error"
          >
            <Text>
              We blocked the website you are trying to reach because it contains harmful material.
              Review our{' '}
              <Link
                display="inlineBlock"
                href="https://policy.pinterest.com/en/community-guidelines"
                underline="always"
              >
                content policy.
              </Link>
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
