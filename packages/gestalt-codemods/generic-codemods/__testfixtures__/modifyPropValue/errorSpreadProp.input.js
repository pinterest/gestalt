import { Box } from 'gestalt';

export default function TestComp() {
  const props = {}
  return (
    <Box {...props} width={400}>
      <Box {...props} >
        <Box/>
      </Box>
    </Box>
  );
}
