import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box  color="red">
      <Box color="red"/>
      <Box  color="red">
        <Box color="red"/>
        <Flex width={400} color="red" />
      </Box>
    </Box>
  );
}
