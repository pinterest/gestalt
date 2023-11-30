// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Datapoint
        size="lg"
        title="Saves"
        value="10,392"
        trend={{ value: -12.193, accessibilityLabel: 'Trending down' }}
      />
    </Box>
  );
}
