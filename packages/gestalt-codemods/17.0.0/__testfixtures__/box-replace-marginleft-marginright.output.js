// @flow strict
import { Box } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Box marginStart={4} marginEnd={4} />
      <Box smMarginStart={4} smMarginEnd={4} />
      <Box mdMarginStart={4} mdMarginEnd={4} />
      <Box lgMarginStart={4} lgMarginEnd={4} />
    </Box>
  );
}
