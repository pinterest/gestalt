// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={4} alignItems="center">
        <Heading align="center" accessibilityLevel={4} size="400">
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
