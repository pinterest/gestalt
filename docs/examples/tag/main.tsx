import { Flex, Tag } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Tag onRemove={() => {}} text="Selected item" />
      <Tag onRemove={() => {}} text="Warning tag" type="warning" />
      <Tag onRemove={() => {}} text="Error tag" type="error" />
    </Flex>
  );
}
