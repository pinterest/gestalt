// @flow strict
import { Box, Heading } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Heading />
      <Heading truncate />
      <Heading truncate={false} />
      <Heading truncate={null} />
      <Heading truncate={undefined} />
    </Box>
  );
}
