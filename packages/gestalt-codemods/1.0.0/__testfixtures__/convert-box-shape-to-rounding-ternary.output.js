// @flow strict
import { Box } from 'gestalt';

const value = true;

export default function Ternary() {
  return (
    <Box rounding={value ? "circle" : 2}>
      ternary
    </Box>
  );
}
