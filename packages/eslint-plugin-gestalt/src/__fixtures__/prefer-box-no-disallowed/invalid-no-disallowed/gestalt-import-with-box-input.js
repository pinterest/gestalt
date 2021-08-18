import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <div onBlur={() => {}}>
        <Box />
      </div>
    </Box>
  );
}
