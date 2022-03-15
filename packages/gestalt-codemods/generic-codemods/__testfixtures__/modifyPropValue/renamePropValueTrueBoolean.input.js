import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} fit>
      <Box fit/>
      <Box fit/>
      <Flex width={400} fit/>
    </Box>
  );
}
