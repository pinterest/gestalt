// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Datapoint
        size="lg"
        title="Total spend"
        value="$14,325"
        trend={{ value: 5.6, accessibilityLabel: 'Trending up' }}
        trendSentiment="neutral"
      />
    </Box>
  );
}
