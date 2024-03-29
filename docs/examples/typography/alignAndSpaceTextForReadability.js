// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, List } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={4}>
        <Heading accessibilityLevel={4} size="400">
          Shopify Marketing would like permission to:
        </Heading>
        <List label="Shopify Marketing permissions" labelDisplay="hidden">
          <List.Item text="See your account settings" />
          <List.Item text="Create new Pins for you" />
          <List.Item text="Send messages on behalf of you" />
          <List.Item text="Follow things for you" />
          <List.Item text="See your secret Pins" />
          <List.Item text="See your secret boards" />
        </List>
      </Flex>
    </Box>
  );
}
