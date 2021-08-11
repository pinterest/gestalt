import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <Box as="article" />
      <Box as="article"></Box>
      <Box aria-label="test" as="article" onMouseEnter={() => {}} width={100}></Box>
    </Box>
  );
}
