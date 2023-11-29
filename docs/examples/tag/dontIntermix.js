// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%" gap={2}>
      <Tag disabled onRemove={() => {}} text="Color" />
      <Tag onRemove={() => {}} text="Tokens" />
      <Tag onRemove={() => {}} text="Design systems" />
    </Flex>
  );
}
