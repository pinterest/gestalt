// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Heading size="500" accessibilityLevel={2}>
          Medium heading level 2
        </Heading>
        <Heading size="400" accessibilityLevel={3}>
          Small heading level 3
        </Heading>
        <Heading size="400" accessibilityLevel="none">
          Small heading without a level
        </Heading>
      </Flex>
    </Box>
  );
}
