// @flow strict
import { type Node } from 'react';
import { Box, Flex, Status } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex>
        <Status type="ok" title="OK" subtext="Updated 2 days ago" />
      </Flex>
    </Box>
  );
}
