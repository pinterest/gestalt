// @flow strict
import { type Node } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      alignItems="center"
      height="100%"
      justifyContent="center"
      width="100%"
      direction="column"
      gap={2}
    >
      <Tag onRemove={() => {}} type="error" text="Error" size="sm" />
      <Tag onRemove={() => {}} text="Small Tag" size="sm" />
      <Tag onRemove={() => {}} text="Medium Tag" size="md" />
      <Tag onRemove={() => {}} type="warning" text="Warning" size="md" />
      <Tag onRemove={() => {}} text="Large Tag" size="lg" />
    </Flex>
  );
}
