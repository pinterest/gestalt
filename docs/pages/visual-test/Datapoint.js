// @flow strict
import { type Node } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Datapoint
        title="Total impressions"
        value="1.23M"
        trend={{ value: -5, accessibilityLabel: 'Trending down' }}
      />
    </Box>
  );
}
