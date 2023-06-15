// @flow strict
import { type Node } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" gap={4}>
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
