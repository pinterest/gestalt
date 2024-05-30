import { Box, Flex, Status } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Status title="Unstarted" type="unstarted" />
        <Status title="Queued" type="queued" />
        <Status title="In progress" type="inProgress" />
        <Status title="Halted" type="halted" />
        <Status title="Locked" type="locked" />
        <Status title="OK" type="ok" />
        <Status title="Canceled" type="canceled" />
        <Status title="Warning" type="warning" />
        <Status title="Problem" type="problem" />
      </Flex>
    </Box>
  );
}
