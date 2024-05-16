import { ReactNode } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" direction="column" gap={4}>
        <Heading accessibilityLevel={4} align="center" size="400">
          Shopify Marketing would like permission to:
        </Heading>
        <Text color="subtle">See your account settings</Text>
        <Text color="subtle">Create new Pins for you</Text>
        <Text color="subtle">Send messages on behalf of you</Text>
        <Text color="subtle">Follow things for you</Text>
        <Text color="subtle"> See your secret Pins</Text>
        <Text color="subtle">See your secret boards</Text>
      </Flex>
    </Box>
  );
}
