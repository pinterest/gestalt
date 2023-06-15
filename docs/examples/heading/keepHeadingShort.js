// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 2, row: 0 }} direction="column">
        <Text weight="bold" size="200">
          Analytics overview
        </Text>
        <Text size="200">
          Organic and paid metrics changed over the last 30 days. This includes impressions, saves
          and outbound clicks.
        </Text>
      </Flex>
    </Box>
  );
}
