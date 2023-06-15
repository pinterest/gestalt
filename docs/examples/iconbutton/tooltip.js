// @flow strict
import { type Node } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButton
        accessibilityLabel="Share"
        icon="share"
        size="lg"
        tooltip={{ text: 'Send pin to others' }}
      />
    </Flex>
  );
}
