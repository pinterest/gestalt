// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, IconButton } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <IconButton accessibilityLabel="Search your Pins" icon="search" />
    </Box>
  );
}
