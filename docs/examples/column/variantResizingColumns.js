// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {Array(4)
        .fill()
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Column key={i} mdSpan={3} span={6}>
            <Box color="secondary" padding={1}>
              <Box color="default" paddingY={2}>
                <Box display="block" mdDisplay="none">
                  <Text align="center">
                    <code>span = 6</code>
                  </Text>
                </Box>
                <Box display="none" mdDisplay="block">
                  <Text align="center">
                    <code>span = 3</code>
                  </Text>
                </Box>
              </Box>
            </Box>
          </Column>
        ))}
    </Flex>
  );
}
