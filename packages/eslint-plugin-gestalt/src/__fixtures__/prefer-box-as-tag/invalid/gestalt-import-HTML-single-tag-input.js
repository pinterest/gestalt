import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <article />
      <article></article>
      <article aria-label="test" onMouseEnter={() => {}} width={100}></article>
    </Box>
  );
}
