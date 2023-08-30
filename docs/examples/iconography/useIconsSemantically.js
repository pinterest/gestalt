// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ row: 2, column: 0 }} alignItems="center">
        <Icon icon="sparkle" accessibilityLabel="sparkle" color="default" size={16} />
        <Text>Recommendation text</Text>
      </Flex>
    </Box>
  );
}
