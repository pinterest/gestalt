import { Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} left>
      <Box left/>
      <Box left/>
      <Flex width={400} fit={false}/>
    </Box>
  );
}
