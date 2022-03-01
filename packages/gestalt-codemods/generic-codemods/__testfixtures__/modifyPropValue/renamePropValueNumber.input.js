import { Box, Button } from 'gestalt';

export default function TestComp() {
  return (
    <Box width="100%" color="red">
      <Box color="red" width="100%"/>
      <Box width="100%"/>
      <Button/>
    </Box>
  );
}
