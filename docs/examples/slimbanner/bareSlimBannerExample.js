// @flow strict
import { type Node } from 'react';
import { Flex, Text, Heading, SlimBanner, Box } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8}>
      <Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
        <Text weight="bold" size="500">
          Campaign details
        </Text>
        <Flex width="100%" direction="column" gap={{ column: 4, row: 0 }}>
          <Heading size="400">Campaign name</Heading>
          <Text>
            Give your campaign a name. Only you will see what you&apos;ve named your campaign.
          </Text>
          <Heading size="400">Campaign spend limits</Heading>
          <Text>
            For video views and web sessions objectives only, campaign spend limits help you control
            the amount your campaign spends.
          </Text>
          <SlimBanner
            type="warningBare"
            message="Spend limits may change your overall billing details."
            iconAccessibilityLabel="Warning"
          />
          <Heading size="400">Campaign status</Heading>
          <Text>
            Set your campaign status to active to begin serving ads as soon as you launch or set
            your campaign status to paused and activate it later.
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
