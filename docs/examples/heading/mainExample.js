// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Heading } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Heading size="500">An H2 Heading example</Heading>;
    </Box>
  );
}
