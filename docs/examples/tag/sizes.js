// @flow strict
import { type Node } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      height="100%"
      justifyContent="center"
      width="100%"
      direction="column"
      gap={{ column: 2, row: 0 }}
    >
      <Flex gap={2} direction="row">
        <Tag onRemove={() => {}} text="Small" size="sm" />
        <Tag onRemove={() => {}} text="Small Warning" type="warning" size="sm" />
        <Tag onRemove={() => {}} text="Small Error" type="error" size="sm" />
      </Flex>
      <Flex gap={2}>
        <Tag onRemove={() => {}} text="Medium" size="md" />
        <Tag onRemove={() => {}} text="Medium Warning" type="warning" size="md" />
        <Tag onRemove={() => {}} text="Medium Error" type="error" size="md" />
      </Flex>
      <Flex gap={2}>
        <Tag onRemove={() => {}} text="Large" size="lg" />
        <Tag onRemove={() => {}} text="Large Warning" size="lg" type="warning" />
        <Tag onRemove={() => {}} text="Large Error" size="lg" type="error" />
      </Flex>
    </Flex>
  );
}
