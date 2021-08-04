import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <Box ref={undefined}>
        <Box />
      </Box>
    </Box>
  );
}
