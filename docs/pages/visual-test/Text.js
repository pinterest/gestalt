// @flow strict
import { type Node, Fragment } from 'react';
import { Box, Text } from 'gestalt';

export default function TextSpec(): Node {
  return (
    <Fragment>
      <Box padding={1}>
        <Text size="100">Text size small</Text>
      </Box>
      <Box padding={1}>
        <Text size="200">Text size medium</Text>
      </Box>
      <Box padding={1}>
        <Text size="300">Text size large</Text>
      </Box>
    </Fragment>
  );
}
