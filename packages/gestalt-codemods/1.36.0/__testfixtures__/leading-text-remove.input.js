// @flow strict
import { Box, Text as Renamed,Text } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Renamed leading='short'>Hello</Renamed>
      <Text leading='short' color='blue'>Hello</Text>
    </Box>
  );
}
