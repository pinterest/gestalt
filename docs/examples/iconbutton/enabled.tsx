import { Flex, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={8} height="100%" justifyContent="center" width="100%" wrap>
      <IconButton accessibilityLabel="Share" bgColor="gray" icon="share" label="gray" size="xl" />
      <IconButton
        accessibilityLabel="Share"
        bgColor="lightGray"
        icon="share"
        label="lightGray"
        size="xl"
      />
      <IconButton accessibilityLabel="Share" bgColor="red" icon="share" label="red" size="xl" />
      <IconButton
        accessibilityLabel="Share"
        bgColor="transparent"
        icon="share"
        label="red"
        size="xl"
      />
      <IconButton
        accessibilityLabel="Share"
        bgColor="transparentDarkGray"
        icon="share"
        label="transparentDarkGray"
        size="xl"
      />
      <IconButton
        accessibilityLabel="Share"
        bgColor="washLight"
        icon="share"
        label="washLight"
        size="xl"
      />
      <IconButton accessibilityLabel="Share" bgColor="white" icon="share" label="white" size="xl" />
    </Flex>
  );
}
