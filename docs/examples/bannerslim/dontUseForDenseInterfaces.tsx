import { ReactNode } from 'react';
import { BannerSlim, Box, Flex, Heading, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }} width="100%">
        <Text size="500" weight="bold">
          Campaign details
        </Text>
        <Flex direction="column" gap={{ column: 4, row: 0 }} width="100%">
          <Heading size="400">Campaign name</Heading>
          <Text>
            Give your campaign a name. Only you will see what you&apos;ve named your campaign.
          </Text>
          <Heading size="400">Campaign spend limits</Heading>
          <Text>
            For video views and web sessions objectives only, campaign spend limits help you control
            the amount your campaign spends.
          </Text>
          <BannerSlim
            iconAccessibilityLabel="Warning"
            message="Spend limits may change your overall billing details."
            type="warning"
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
