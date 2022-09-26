// @flow strict
import { type Node } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignContent="center" height="100%" justifyContent="center" width="100%">
      <Button text="Create account" size="lg" color="red" />
    </Flex>
  );
}
