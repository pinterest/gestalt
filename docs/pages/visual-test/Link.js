// @flow strict
import { type Node } from 'react';
import { Text, Link, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={4}>
      <Text inline>
        Visit our{' '}
        <Link inline href="https://pinterest.com">
          Business Help Center
        </Link>
      </Text>
    </Box>
  );
}
