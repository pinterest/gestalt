// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width={130}>
        <Flex alignItems="center" direction="column" gap={4}>
          <Text>Menu Item 1</Text>
          <Text>Menu Item 2</Text>
          <Text>Menu Item 3</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
