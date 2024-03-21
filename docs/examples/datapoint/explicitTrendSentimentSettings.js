// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Datapoint
          title="Bounce rate"
          trend={{ value: 29, accessibilityLabel: 'Trending up' }}
          trendSentiment="bad"
          value="86.3%"
        />
        <Datapoint
          title="Conversion falloffs"
          trend={{ value: -10, accessibilityLabel: 'Tending down' }}
          trendSentiment="good"
          value="92"
        />
        <Datapoint
          title="Spend"
          trend={{ value: -4, accessibilityLabel: 'Trending down' }}
          trendSentiment="neutral"
          value="$19.3k"
        />
      </Flex>
    </Box>
  );
}
