import { ReactNode } from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="end" direction="column" gap={{ column: 1, row: 0 }}>
        <Status title="This item has a problem" type="problem" />
        <Text align="center" weight="bold">
          Dynamic re-targeting
        </Text>
      </Flex>
    </Box>
  );
}
