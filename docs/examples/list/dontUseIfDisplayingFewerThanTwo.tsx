import { ReactNode } from 'react';
import { Box, Flex, Heading, List, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={12} maxWidth={600}>
        <Heading accessibilityLevel="none">August 15, 2022</Heading>
        <List label={<Text weight="bold">Shopping</Text>} type="unordered">
          <List.Item text="Added new catalog endpoint to list filtered products." />
        </List>
      </Flex>
    </Box>
  );
}
