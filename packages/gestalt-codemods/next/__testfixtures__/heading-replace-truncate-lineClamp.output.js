// @flow strict
import { Box, Heading } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Heading />
      <Heading lineClamp={1} />
      <Heading />
      <Heading />
      <Heading />
    </Box>
  );
}
