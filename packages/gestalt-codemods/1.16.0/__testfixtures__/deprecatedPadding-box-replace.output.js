// @flow strict
import { Box, Box as Boxie } from 'gestalt';

export default function TestBox() {
  return (
    <Boxie padding={2}>
      <Box
        alignItems="center"
        paddingX={2}>
          <Box />
      </Box>
      <Box
        paddingY={2}>
          <Box />
      </Box>
      <Box alignItems="center" paddingX={2} paddingY={3}>
          <Box />
      </Box>
    </Boxie>
  );
}
