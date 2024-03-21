// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Datapoint
        size="lg"
        title="Total impressions"
        trend={{ value: 10.1, accessibilityLabel: 'Trending up' }}
        value="1,451"
      />
    </Box>
  );
}
