// @flow strict
import { Box, Text as Renamed,Text } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Renamed>Hello</Renamed>
      <Text color='blue'>Hello</Text>
    </Box>
  );
}
