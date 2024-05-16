import { ReactNode } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={4}>
        <Flex.Item flexBasis={200}>
          <Text>Some text</Text>
        </Flex.Item>
        <Text>Some text</Text>
        <Flex.Item flexBasis="10em">
          <Text>Some really really really really really really really long text</Text>
        </Flex.Item>
      </Flex>
    </Flex>
  );
}
