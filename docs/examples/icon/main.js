// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex gap={2} alignItems="center">
        <Icon icon="pin" accessibilityLabel="Pin" color="default" />
        <Text align="center" color="default" weight="bold">
          Pinterest
        </Text>
      </Flex>
    </Flex>
  );
}
