// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="200" weight="bold">
          Analytics overview of organic and paid metrics changed over the past 30 days against the
          previous 30 days
        </Text>
        <Text size="200">This includes impressions, saves and outbound clicks.</Text>
      </Flex>
    </Box>
  );
}
