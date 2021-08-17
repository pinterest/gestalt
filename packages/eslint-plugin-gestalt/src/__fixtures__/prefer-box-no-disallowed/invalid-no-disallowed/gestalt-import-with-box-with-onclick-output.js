import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <Box role="button">
        <div role="button" onClick={() => {}}>
          <Box />
        </div>
      </Box>
    </Box>
  );
}
