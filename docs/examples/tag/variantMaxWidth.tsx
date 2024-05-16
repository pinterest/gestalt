import { Flex, Tag } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag onRemove={() => {}} text="The quick brown fox jumps over the lazy dog" />
    </Flex>
  );
}
