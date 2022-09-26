// @flow strict
import { type Node } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button accessibilityLabel="Save" color="red" text="Save" size="lg" />
    </Flex>
  );
}
