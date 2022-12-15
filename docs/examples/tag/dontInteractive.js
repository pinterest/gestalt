// @flow strict
import { type Node } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Tag disabled onRemove={() => {}} text="Visit Pinterest" />
    </Flex>
  );
}
