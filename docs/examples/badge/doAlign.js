// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={4}>
        <Text size="600">
          Ads & Campaigns <Badge text="Beta" position="top" />
        </Text>
        <Text size="300">
          Ads & Campaigns <Badge text="Beta" />
        </Text>
      </Flex>
    </Flex>
  );
}
