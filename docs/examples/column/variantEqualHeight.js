// @flow strict
import { type Node } from 'react';
import { Box, Column, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Column span={6}>
        <Box color="dark" padding={2}>
          <Text color="inverse">Tall column</Text>
          <Box height={200} />
          <Text color="inverse">With lots of content</Text>
        </Box>
      </Column>

      <Column span={6}>
        <Box color="tertiary" height="100%" padding={2}>
          <Text color="inverse">Short column</Text>
        </Box>
      </Column>
    </Flex>
  );
}
