// @flow strict
import { type Node } from 'react';
import { Box, Heading } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Heading size="500">An H2 Heading example</Heading>;
    </Box>
  );
}
