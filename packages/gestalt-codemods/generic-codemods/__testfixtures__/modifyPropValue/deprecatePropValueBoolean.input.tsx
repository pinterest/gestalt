// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} fit={false}>
      <Box fit={false}/>
      <Box width={400} fit={false}>
        <Box fit={false}/>
        <Flex width={400} fit={false}/>
      </Box>
    </Box>
  );
}
