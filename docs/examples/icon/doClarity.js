// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Icon icon="tag" accessibilityLabel="" color="default" />
        <Text size="300" weight="bold">
          Shopping spotlight
        </Text>
      </Flex>
    </Flex>
  );
}
