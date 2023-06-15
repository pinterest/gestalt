// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex gap={2} alignItems="center">
        <Icon icon="eye" accessibilityLabel="Number of views" color="default" />
        <Text weight="bold" size="300">
          4
        </Text>
      </Flex>
    </Flex>
  );
}
