// @flow strict
import { Box, Text } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Text />
      <Text truncate />
      <Text truncate={false} />
      <Text truncate={null} />
      <Text truncate={undefined} />
    </Box>
  );
}
