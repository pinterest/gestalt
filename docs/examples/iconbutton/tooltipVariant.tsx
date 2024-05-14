import { Flex, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <IconButton
        accessibilityLabel="Sharing"
        icon="share"
        tooltip={{
          text: 'This Pin is private unless you share it with others.',
          idealDirection: 'up',
        }}
      />
      <IconButton
        accessibilityLabel="Edit"
        icon="edit"
        tooltip={{
          text: 'Edit',
          accessibilityLabel: '',
          idealDirection: 'up',
        }}
      />
    </Flex>
  );
}
