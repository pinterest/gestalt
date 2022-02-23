// @flow strict
import { type Node } from 'react';
import { Flex, Datapoint, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={2}>
        <Datapoint
          title="Total impressions"
          value="1.23M"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
        />
      </Flex>
    </Box>
  );
}
