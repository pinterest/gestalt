// @flow strict
import { type Node } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Flex direction="row" gap={2}>
        <Tag onRemove={() => {}} size="sm" text="Small" />
        <Tag onRemove={() => {}} size="sm" text="Small Warning" type="warning" />
        <Tag onRemove={() => {}} size="sm" text="Small Error" type="error" />
      </Flex>
      <Flex gap={2}>
        <Tag onRemove={() => {}} size="md" text="Medium" />
        <Tag onRemove={() => {}} size="md" text="Medium Warning" type="warning" />
        <Tag onRemove={() => {}} size="md" text="Medium Error" type="error" />
      </Flex>
      <Flex gap={2}>
        <Tag onRemove={() => {}} size="lg" text="Large" />
        <Tag onRemove={() => {}} size="lg" text="Large Warning" type="warning" />
        <Tag onRemove={() => {}} size="lg" text="Large Error" type="error" />
      </Flex>
    </Flex>
  );
}
