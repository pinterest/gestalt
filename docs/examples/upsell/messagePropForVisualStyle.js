// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text, Upsell } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={6}>
        <Text weight="bold">Simple message string</Text>
        <Upsell
          message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
          title="Give $30, get $60 in ads credit"
        />
        <Text weight="bold">Rich message with Text component</Text>
        <Upsell
          message={
            <Text inline>
              Earn $60 of ads credit, and give $30 of ads credit to a friend.{' '}
              <Link accessibilityLabel="Learn more about credit" display="inline" href="#Message">
                Learn more
              </Link>
            </Text>
          }
          title="Give $30, get $60 in ads credit"
        />
      </Flex>
    </Box>
  );
}
