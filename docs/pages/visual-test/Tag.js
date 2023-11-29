// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 2,
      }}
    >
      <Tag onRemove={() => {}} text="New" />
      <Tag disabled onRemove={() => {}} text="Disabled" />
      <Tag onRemove={() => {}} type="error" text="Error" />
      <Tag onRemove={() => {}} type="warning" text="Warning" />
      <Tag
        onRemove={() => {}}
        text="Some really long text that just keeps going on and on and on and on and on and on"
      />
    </Flex>
  );
}
