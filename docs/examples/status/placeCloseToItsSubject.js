// @flow strict
import { type Node } from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ row: 1, column: 0 }} alignItems="center">
        <Status accessibilityLabel="This item is complete" type="ok" />
        <Text weight="bold" size="300">
          Campaign complete
        </Text>
      </Flex>
    </Box>
  );
}
