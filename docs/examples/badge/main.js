// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Text>Update your pronouns in your profile settings</Text>
        <Badge text="New" />
      </Flex>
    </Flex>
  );
}
