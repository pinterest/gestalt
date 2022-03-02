// @flow strict
import { Box, Text as GestaltText } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <GestaltText />
      <GestaltText truncate />
      <GestaltText truncate={false} />
      <GestaltText truncate={null} />
      <GestaltText truncate={undefined} />
    </Box>
  );
}
