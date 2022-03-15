import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} >
      <Box  />
      <Box width={400} >
        <Box  />
        <Flex width={400} fit />
      </Box>
    </Box>
  );
}
