// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={2}>
        <Text size="300" weight="bold">
          Impressions
        </Text>
        <Text size="100">1,250,000</Text>
      </Flex>
    </Flex>
  );
}
