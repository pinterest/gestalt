// @flow strict
import { Box, Text as GestaltText } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltText />
      <GestaltText lineClamp={1} />
      <GestaltText />
      <GestaltText />
      <GestaltText />
    </Box>
  );
}
