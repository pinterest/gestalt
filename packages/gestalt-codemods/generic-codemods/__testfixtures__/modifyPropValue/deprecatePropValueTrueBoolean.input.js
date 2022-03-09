import { Box } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} fit>
      <Box fit/>
      <Box width={400} fit>
        <Box fit/>
      </Box>
    </Box>
  );
}
