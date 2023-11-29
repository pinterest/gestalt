// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag onRemove={() => {}} text="The quick brown fox jumps over the lazy dog" />
    </Flex>
  );
}
