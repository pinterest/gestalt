import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <div ref={undefined}>
        <Box />
      </div>
    </Box>
  );
}
