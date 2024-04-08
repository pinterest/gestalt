// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
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

export default function Example(): ReactNode {
  const [showComponent, setShowComponent] = useState(true);
  const [checked1, setChecked1] = useState(false);

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
            accessibilityModalLabel="Delete current Pin draft confirmation"
            heading="Delete this page?"
            onDismiss={() => {}}
            primaryAction={{
              accessibilityLabel: 'Delete page',
              label: 'Delete page',
              onClick: () => {},
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel, keep page',
              label: 'Cancel',
              onClick: () => {},
              role: 'button',
            }}
          >
            <Flex direction="column" flex="grow" gap={4}>
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
