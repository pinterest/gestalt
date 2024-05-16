import {ReactNode} from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={{ column: 0, row: 1 }}>
        <Status accessibilityLabel="This item has a problem" type="problem" />
        <Text size="300" weight="bold">
          Dynamic re-targeting
        </Text>
      </Flex>
    </Box>
  );
}
