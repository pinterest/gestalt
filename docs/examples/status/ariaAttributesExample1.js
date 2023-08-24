// @flow strict
import { type Node } from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 0, row: 1 }}>
        <Status accessibilityLabel="This item has a problem" type="problem" />
        <Text weight="bold" size="300">
          Dynamic re-targeting
        </Text>
      </Flex>
    </Box>
  );
}
