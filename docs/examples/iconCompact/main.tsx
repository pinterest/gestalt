import { Flex, IconCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <IconCompact accessibilityLabel="Pin" icon="compact-add" />
      </Flex>
    </Flex>
  );
}
