// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column">
        <Text size="200">Impressions</Text>
        <Text size="500" weight="bold">
          1.25M
        </Text>
      </Flex>
    </Flex>
  );
}
