// @flow strict
import { Fragment, type Node, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  ModalAlert,
  Text,
} from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const [checked1, setChecked1] = useState(false);

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
            accessibilityModalLabel="Delete current Pin draft confirmation"
            heading="Delete this page?"
            primaryAction={{
              accessibilityLabel: 'Delete page',
              label: 'Delete page',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel, keep page',
              label: 'Cancel',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Flex direction="column" gap={4} flex="grow">
              <Text>
                If you change your mind, you&apos;ll have to create this pin again—starting from the
                very beginning.
              </Text>
              <Checkbox
                checked={checked1}
                id="checkbox-show-again"
                label="Got it—don't warn me again"
                onChange={({ checked }) => setChecked1(checked)}
              />
            </Flex>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
