import { ReactNode } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Snapshot() {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Datapoint
        title="Total impressions"
        trend={{ value: -5, accessibilityLabel: 'Trending down' }}
        value="1.23M"
      />
    </Box>
  );
}
