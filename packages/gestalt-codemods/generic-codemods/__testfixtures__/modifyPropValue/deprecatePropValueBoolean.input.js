import { Box } from 'gestalt';

export default function TestComp() {
  return (
    <Box width={400} fit={false}>
      <Box fit={false}/>
      <Box width={400} fit={false}>
        <Box fit={false}/>
      </Box>
    </Box>
  );
}
