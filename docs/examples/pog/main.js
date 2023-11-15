// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Pog } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Pog icon="heart" iconColor="red" />
    </Box>
  );
}
