// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <Tag disabled onRemove={() => {}} text="Color" />
      <Tag onRemove={() => {}} text="Tokens" />
      <Tag onRemove={() => {}} text="Design systems" />
    </Flex>
  );
}
