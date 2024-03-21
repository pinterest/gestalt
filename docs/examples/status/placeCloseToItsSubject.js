// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
        <Status accessibilityLabel="This item is complete" type="ok" />
        <Text size="300" weight="bold">
          Campaign complete
        </Text>
      </Flex>
    </Box>
  );
}
