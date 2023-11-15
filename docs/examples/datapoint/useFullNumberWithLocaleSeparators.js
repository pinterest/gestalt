// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Datapoint
        size="lg"
        title="Total impressions"
        value="1,451"
        trend={{ value: 10.1, accessibilityLabel: 'Trending up' }}
      />
    </Box>
  );
}
