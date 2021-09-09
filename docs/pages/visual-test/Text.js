// @flow strict
import { type Node, Fragment } from 'react';
import { Box, Text } from 'gestalt';

export default function TextSpec(): Node {
  return (
    <Fragment>
      <Box padding={1}>
        <Text size="sm">Text size small</Text>
      </Box>
      <Box padding={1}>
        <Text size="md">Text size medium</Text>
      </Box>
      <Box padding={1}>
        <Text size="lg">Text size large</Text>
      </Box>
    </Fragment>
  );
}
