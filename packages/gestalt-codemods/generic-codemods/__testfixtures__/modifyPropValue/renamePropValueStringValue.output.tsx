// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box height="200%" color="red">
      <Box color="red"/>
      <Box color="red"/>
      <Flex height="100%" color="red"/>
    </Box>
  );
}
