import { ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="200" weight="bold">
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
