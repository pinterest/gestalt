// @flow strict
import { type Node } from 'react';
import { Box, Datapoint, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Datapoint
          title="Pin clicks"
          value="1.23k"
          trend={{ value: 12, accessibilityLabel: 'Trending up' }}
        />
        <Datapoint title="Saves" value="123" trend={{ value: 0, accessibilityLabel: '' }} />
        <Datapoint
          title="Total impressions"
          value="1.23m"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
        />
      </Flex>
    </Box>
  );
}
