// @flow strict
import { type Node } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Column span={12} mdSpan={6}>
        <Box color="secondary" padding={1}>
          <Box color="default" paddingY={2}>
            <Box display="block" mdDisplay="none">
              <Text align="center">
                <code>span = 12</code>
              </Text>
            </Box>
            <Box display="none" mdDisplay="block">
              <Text align="center">
                <code>span = 6</code>
              </Text>
            </Box>
          </Box>
        </Box>
      </Column>
      <Column span={12} mdSpan={6}>
        <Box color="secondary" padding={1}>
          <Box color="default" paddingY={2}>
            <Box display="block" mdDisplay="none">
              <Text align="center">
                <code>span = 12</code>
              </Text>
            </Box>
            <Box display="none" mdDisplay="block">
              <Text align="center">
                <code>span = 6</code>
              </Text>
            </Box>
          </Box>
        </Box>
      </Column>
    </Flex>
  );
}
