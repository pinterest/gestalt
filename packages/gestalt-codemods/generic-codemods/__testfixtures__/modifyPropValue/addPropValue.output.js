import { Box } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} variant="error">
      <Box variant="error">
        <Box variant="error" />
      </Box>
    </Box>
  );
}
