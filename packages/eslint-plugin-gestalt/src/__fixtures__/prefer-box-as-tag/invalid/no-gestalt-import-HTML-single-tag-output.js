import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <div>
      <Box as="article" />
      <Box as="article"></Box>
      <Box aria-label="test" as="article" onMouseEnter={() => {}} width={100}></Box>
    </div>
  );
}
