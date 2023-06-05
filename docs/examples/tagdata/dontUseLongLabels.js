// @flow strict
import { type Node } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <TagData showCheckbox text="The last 24 hours of activity in your account" />
    </Flex>
  );
}
