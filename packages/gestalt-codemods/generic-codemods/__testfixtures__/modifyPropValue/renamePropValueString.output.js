import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} variant="error">
      <Box variant="error"/>
      <Box variant="error"/>
      <Flex width={400} color="red"/>
    </Box>
  );
}
