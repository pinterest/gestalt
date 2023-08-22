// @flow strict
import { type Node } from 'react';
import { Box, Datapoint, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Datapoint size="md" title="January spend" value="$14,325" />
        <Datapoint size="md" title="February spend" value="$12,150" />
        <Datapoint size="md" title="March spend" value="$23,700" />
        <Datapoint size="md" title="April spend" value="$9,525" />
        <Datapoint size="md" title="May spend" value="$10,750" />
      </Flex>
    </Box>
  );
}
