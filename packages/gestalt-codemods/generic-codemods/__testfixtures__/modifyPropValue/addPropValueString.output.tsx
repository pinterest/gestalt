// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} variant="error">
      <Box variant="error">
        <Box variant="error" />
        <Flex />
      </Box>
    </Box>
  );
}
