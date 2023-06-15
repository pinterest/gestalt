// @flow strict
import { type Node } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" gap={2}>
      <IconButton
        accessibilityLabel="This IconButton is an example of IconButton acting as a button"
        icon="share"
        onClick={() => {}}
        tooltip={{ text: 'Button Example' }}
      />
    </Flex>
  );
}
