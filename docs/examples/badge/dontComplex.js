// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Text size="300">7 wardrobe trends</Text>
        <Badge text="Fresh off the press" />
      </Flex>
    </Flex>
  );
}
