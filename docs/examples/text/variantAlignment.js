// @flow strict
import { type Node } from 'react';
import { Divider, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width={200}>
        <Text align="start">Start (default)</Text>
        <Divider />
        <Text align="end">End</Text>
        <Divider />
        <Text align="center">Center</Text>
        <Divider />
        <Text align="forceLeft">Force left</Text>
        <Divider />
        <Text align="forceRight">Force right</Text>
      </Flex>
    </Flex>
  );
}
