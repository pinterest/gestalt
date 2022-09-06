// @flow strict
import { type Node } from 'react';
import { Flex, Avatar } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Avatar size="lg" name="😀" />
    </Flex>
  );
}
