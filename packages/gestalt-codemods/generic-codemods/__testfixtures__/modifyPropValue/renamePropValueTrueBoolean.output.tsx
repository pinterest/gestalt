// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} left={false}>
      <Box left={false}/>
      <Box left={false}/>
      <Flex width={400} fit/>
    </Box>
  );
}
