import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <div role="button">
        <div role="button" onClick={() => {}}>
          <Box />
        </div>
      </div>
    </Box>
  );
}
