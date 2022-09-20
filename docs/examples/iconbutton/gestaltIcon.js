// @flow strict
import { type Node } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" gap={2}>
      <IconButton
        accessibilityLabel="Go to next steps"
        icon="directional-arrow-right"
        tooltip={{ text: 'Built-in Gestalt Icon' }}
      />
    </Flex>
  );
}
