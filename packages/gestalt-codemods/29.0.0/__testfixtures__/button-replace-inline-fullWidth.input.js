// @flow strict
import { Box, Button } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Button />
      <Button inline />
      <Button inline={false} />
    </Box>
  );
}
