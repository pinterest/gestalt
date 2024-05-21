// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box color="red">
      <Box color="blue">
        <Box />
        <Flex color="red"/>
      </Box>
    </Box>
  );
}
