// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box height={40} color="red">
      <Box color="red" height={40}/>
      <Box height={40}/>
      <Flex width="100%" color="red"/>
    </Box>
  );
}
