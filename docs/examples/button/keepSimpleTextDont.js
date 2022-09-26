// @flow strict
import { type Node } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignContent="center" height="100%" justifyContent="center" width="100%">
      <Button text="Create new Pinterest account" size="lg" color="red" iconEnd="person-add" />
    </Flex>
  );
}
