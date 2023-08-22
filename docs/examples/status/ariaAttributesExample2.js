// @flow strict
import { type Node } from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex alignItems="end" direction="column" gap={{ column: 1, row: 0 }}>
        <Status title="This item has a problem" type="problem" />
        <Text align="center" weight="bold">
          Dynamic re-targeting
        </Text>
      </Flex>
    </Box>
  );
}
