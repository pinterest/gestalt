// @flow strict
import { type Node } from 'react';
import { Box, Datapoint, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Datapoint
          title="Bounce rate"
          value="86.3%"
          trend={{ value: 29, accessibilityLabel: 'Trending up' }}
          trendSentiment="bad"
        />
        <Datapoint
          title="Conversion falloffs"
          value="92"
          trend={{ value: -10, accessibilityLabel: 'Tending down' }}
          trendSentiment="good"
        />
        <Datapoint
          title="Spend"
          value="$19.3k"
          trend={{ value: -4, accessibilityLabel: 'Trending down' }}
          trendSentiment="neutral"
        />
      </Flex>
    </Box>
  );
}
