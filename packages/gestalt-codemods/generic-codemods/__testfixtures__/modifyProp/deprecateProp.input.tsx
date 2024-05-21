// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} height="100%">
      <Box height="100%"/>
      <Flex width={400} height="100%"/>
    </Box>
  );
}
