import { Box, Status } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Status subtext="Please try again" title="Error" type="problem" />
    </Box>
  );
}
