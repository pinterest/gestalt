// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerUpsell, Box, Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={6}>
        <Text weight="bold">Simple message string</Text>
        <BannerUpsell
          message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
          title="Give $30, get $60 in ads credit"
        />
        <Text weight="bold">Rich message with Text component</Text>
        <BannerUpsell
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
