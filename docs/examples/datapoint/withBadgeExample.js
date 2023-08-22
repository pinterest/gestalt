// @flow strict
import { type Node } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Datapoint
        title="Spend"
        value="$5.7k"
        tooltipText="Total ad spend in the selected time period"
        badge={{ text: 'Early access' }}
      />
    </Box>
  );
}
