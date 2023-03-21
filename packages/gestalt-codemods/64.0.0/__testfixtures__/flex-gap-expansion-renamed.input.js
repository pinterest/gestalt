// @flow strict
import { Box, Flex as GestaltFlex, Text } from 'gestalt';

export default function TestComponent() {
  return (
    <Box>
      <GestaltFlex gap={3}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </GestaltFlex>
    </Box>
  );
}
