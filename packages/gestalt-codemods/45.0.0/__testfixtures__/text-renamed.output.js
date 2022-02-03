// @flow strict
import {Box, Text as GestaltText} from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltText size="100">Test</GestaltText>
      <GestaltText size="200">Test</GestaltText>
      <GestaltText size="300">Test</GestaltText>
    </Box>
  );
}
