// @flow strict
import { type Node } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag onRemove={() => {}} text="Warning tag" type="warning" />
    </Flex>
  );
}
