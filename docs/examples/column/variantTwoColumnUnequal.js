// @flow strict
import { type Node } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Column span={8}>
        <Box color="secondary" padding={1}>
          <Box color="default" paddingY={2}>
            <Text align="center">
              <code>span = 8</code>
            </Text>
          </Box>
        </Box>
      </Column>
      <Column span={4}>
        <Box color="secondary" padding={1}>
          <Box color="default" paddingY={2}>
            <Text align="center">
              <code>span = 4</code>
            </Text>
          </Box>
        </Box>
      </Column>
    </Flex>
  );
}
