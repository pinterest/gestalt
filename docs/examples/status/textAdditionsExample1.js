// @flow strict
import { type Node } from 'react';
import { Box, Flex, Status } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Status type="unstarted" title="Unstarted" />
        <Status type="queued" title="Queued" />
        <Status type="inProgress" title="In progress" />
        <Status type="halted" title="Halted" />
        <Status type="ok" title="OK" />
        <Status type="canceled" title="Canceled" />
        <Status type="warning" title="Warning" />
        <Status type="problem" title="Problem" />
      </Flex>
    </Box>
  );
}
