// @flow strict
import { type Node } from 'react';
import { Box, Pog } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Pog icon="heart" iconColor="red" />
    </Box>
  );
}
