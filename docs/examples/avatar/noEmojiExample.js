// @flow strict
import { type Node as ReactNode } from 'react';
import { Avatar, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Avatar name="😀" size="lg" />
    </Flex>
  );
}
