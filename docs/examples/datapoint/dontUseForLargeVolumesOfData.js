// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Datapoint, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
