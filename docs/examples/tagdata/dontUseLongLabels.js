// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TagData showCheckbox text="The last 24 hours of activity in your account" />
    </Flex>
  );
}
