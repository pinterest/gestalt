import {ReactNode} from 'react';
import { Box, Flex, Status, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" direction="column" gap={{ column: 12, row: 0 }}>
        <Status accessibilityLabel="This item is paused" type="halted" />
        <Text size="300" weight="bold">
          Campaign paused
        </Text>
      </Flex>
    </Box>
  );
}
