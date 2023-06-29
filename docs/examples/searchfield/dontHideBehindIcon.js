// @flow strict
import { type Node } from 'react';
import { Box, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <IconButton accessibilityLabel="Search your Pins" icon="search" />
    </Box>
  );
}
