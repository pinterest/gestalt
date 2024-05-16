import {ReactNode} from 'react';
import { Box, Flex, Status } from 'gestalt';

export default function Screenshot() {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 4,
        }}
      >
        <Status subtext="Updated 2 days ago" title="Warning" type="warning" />
        <Status subtext="Please try again" title="Problem" type="problem" />
        <Status title="Unstarted" type="unstarted" />
        <Status title="Queued" type="queued" />
        <Status title="In progress" type="inProgress" />
        <Status title="Halted" type="halted" />
        <Status title="OK" type="ok" />
        <Status title="Canceled" type="canceled" />
      </Flex>
    </Box>
  );
}
