// @flow strict
import { type Node as ReactNode } from 'react';
import { Button, Flex, IconButton } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <Button size="lg" text="Cancel" />
      <IconButton
        accessibilityLabel="Open edit modal"
        icon="trash-can"
        iconColor="red"
        onClick={() => {}}
        size="lg"
      />
    </Flex>
  );
}
