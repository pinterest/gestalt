// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column">
        <Text weight="bold" size="500">
          Start a conversation
        </Text>
        <Text size="200">
          Great content should highlight you and your ideas. Put your original spin on something and
          don’t be afraid to let your own perspective shine. For example: Fashion inspiration to
          freshen up a wardrobe.
        </Text>
      </Flex>
    </Box>
  );
}
