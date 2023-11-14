// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Datapoint
        title="Spend"
        value="$5.7k"
        tooltipText="Total ad spend in the selected time period"
      />
    </Box>
  );
}
