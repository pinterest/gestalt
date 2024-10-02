import { Flex, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
        accessibilityLabel="Share"
        bgColor="lightGray"
        icon="share"
        iconColor="darkGray"
        label="Share"
        size="xl"
        tooltip={{ text: 'Send pin to others', idealDirection: 'up' }}
      />
    </Flex>
  );
}
