// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} >
      <Box  />
      <Box width={400} >
        <Box  />
        <Flex width={400} color="red" />
      </Box>
    </Box>
  );
}
