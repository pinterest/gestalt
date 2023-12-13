// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Tag onRemove={() => {}} text="Design systems" />
    </Flex>
  );
}
