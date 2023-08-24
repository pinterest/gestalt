// @flow strict
import { type Node } from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 12, row: 0 }} direction="column" alignItems="center">
        <Status accessibilityLabel="This item is paused" type="halted" />
        <Text weight="bold" size="300">
          Campaign paused
        </Text>
      </Flex>
    </Box>
  );
}
