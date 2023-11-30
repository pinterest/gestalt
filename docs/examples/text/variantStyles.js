// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" alignItems="start" gap={2}>
        <Text weight="bold">Bold</Text>
        <Text italic>Italic</Text>
        <Text underline>Underline</Text>
      </Flex>
    </Flex>
  );
}
