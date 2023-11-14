// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Status } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex>
        <Status type="ok" title="OK" subtext="Updated 2 days ago" />
      </Flex>
    </Box>
  );
}
