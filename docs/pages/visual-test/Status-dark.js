// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Status } from 'gestalt';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Status type="warning" title="Warning" subtext="Updated 2 days ago" />
          <Status type="problem" title="Problem" subtext="Please try again" />
          <Status type="unstarted" title="Unstarted" />
          <Status type="queued" title="Queued" />
          <Status type="inProgress" title="In progress" />
          <Status type="halted" title="Halted" />
          <Status type="ok" title="OK" />
          <Status type="canceled" title="Canceled" />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
