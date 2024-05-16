import { Flex, Tag } from 'gestalt';

export default function Snapshot() {
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
      <Tag onRemove={() => {}} text="Error" type="error" />
      <Tag onRemove={() => {}} text="Warning" type="warning" />
      <Tag
        onRemove={() => {}}
        text="Some really long text that just keeps going on and on and on and on and on and on"
      />

      <Flex gap={2}>
        <Tag onRemove={() => {}} size="sm" text="Small Tag" />
        <Tag onRemove={() => {}} size="md" text="Medium Tag" />
        <Tag onRemove={() => {}} size="lg" text="Large Tag" />
      </Flex>
    </Flex>
  );
}
