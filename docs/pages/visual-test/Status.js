// @flow strict
import { type Node } from 'react';
import { Flex, Status, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={4}>
        <Status type="warning" title="Warning" subtext="Updated 2 days ago" />
        <Status type="problem" title="Problem" subtext="Please try again" />
        <Status type="unstarted" title="Unstarted" />
        <Status type="inProgress" title="In progress" />
        <Status type="halted" title="Halted" />
        <Status type="ok" title="OK" />
        <Status type="canceled" title="Canceled" />
      </Flex>
    </Box>
  );
}
