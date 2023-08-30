// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={250}>
        <Heading accessibilityLevel={4} size="400">
          Cheesy chicken sandwich
        </Heading>
        <Text lineClamp={3}>
          An updated twist to a grilled classic. This is a delicious treat, especially if you are a
          chicken lover. Make sure to try this out!
        </Text>
      </Flex>
    </Box>
  );
}
