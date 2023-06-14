// @flow strict
import { type Node } from 'react';
import { Button, Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" gap={2}>
      <Button text="Cancel" size="lg" />
      <IconButton
        accessibilityLabel="Open edit modal"
        icon="trash-can"
        onClick={() => {}}
        iconColor="red"
        size="lg"
      />
    </Flex>
  );
}
