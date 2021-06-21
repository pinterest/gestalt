// @flow strict
import { Box, Button } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Button fullWidth={false} />
      <Button />
    </Box>
  );
}
