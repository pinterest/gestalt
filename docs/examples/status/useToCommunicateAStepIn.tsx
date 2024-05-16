import { Box, Status } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Status accessibilityLabel="This item is ok" type="ok" />
    </Box>
  );
}
