// @flow strict
import { type Node } from 'react';
import { Tag, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag onRemove={() => {}} removeIconAccessibilityLabel="Remove New tag" text="New" />
    </Flex>
  );
}
