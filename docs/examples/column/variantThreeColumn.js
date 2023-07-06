// @flow strict
import { type Node } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {Array(3)
        .fill()
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Column span={4} key={i}>
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
