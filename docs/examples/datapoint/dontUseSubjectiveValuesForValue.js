// @flow strict
import { type Node } from 'react';
import { Box, Datapoint } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Datapoint size="lg" title="Performance" value="Bad" />
    </Box>
  );
}
