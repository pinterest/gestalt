// @flow strict
import { type Node } from 'react';
import { Badge, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex gap={4} direction="column">
        <Text size="300">
          Ads & Campaigns <Badge text="New" />
        </Text>
        <Text size="600">
          Ads & Campaigns <Badge text="Beta" position="top" />
        </Text>
      </Flex>
    </Flex>
  );
}
