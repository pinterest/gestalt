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
