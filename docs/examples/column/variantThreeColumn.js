// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {Array(3)
        .fill()
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Column key={i} span={4}>
            <Box color="secondary" padding={1}>
              <Box color="default" paddingY={2}>
                <Text align="center">
                  <code>span = 4</code>
                </Text>
              </Box>
            </Box>
          </Column>
        ))}
    </Flex>
  );
}
