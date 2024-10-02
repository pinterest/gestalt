import { Flex, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={8} height="100%" justifyContent="center" width="100%" wrap>
      <IconButton
        accessibilityLabel="Share"
        bgColor="gray"
        icon="share"
        label="selected"
        selected
        size="xl"
      />
      <IconButton
        accessibilityLabel="Share"
        bgColor="lightGray"
        disabled
        icon="share"
        label="disabled + selected"
        selected
        size="xl"
      />
    </Flex>
  );
}
