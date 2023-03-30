// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Link, Text } from 'gestalt';

export default function ErrorSingleAction(): Node {
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
            type="error"
            accessibilityModalLabel="Site blocked error"
            heading="Website blocked"
            primaryAction={{
              accessibilityLabel: 'Acknowledge site blocked',
              label: 'Got it',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Text>
              We blocked the website you are trying to reach because it contains harmful material.
              Review our{' '}
              <Link
                underline="always"
                display="inlineBlock"
                href="https://policy.pinterest.com/en/community-guidelines"
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
