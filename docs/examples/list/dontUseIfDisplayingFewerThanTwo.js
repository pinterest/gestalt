// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, List, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={12} direction="column" maxWidth={600}>
        <Heading accessibilityLevel="none">August 15, 2022</Heading>
        <List label={<Text weight="bold">Shopping</Text>} type="unordered">
          <List.Item text="Added new catalog endpoint to list filtered products." />
        </List>
      </Flex>
    </Box>
  );
}
