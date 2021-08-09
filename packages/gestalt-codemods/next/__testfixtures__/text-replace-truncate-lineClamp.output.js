// @flow strict
import { Box, Text } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Text />
      <Text lineClamp={1} />
      <Text />
      <Text />
      <Text />
    </Box>
  );
}
