import { Box, Button } from 'gestalt';

export default function TestComp() {
  return (
    <Box height={40} color="red">
      <Box color="red" height={40}/>
      <Box height={40}/>
      <Button/>
    </Box>
  );
}
