// @flow strict
import { Box, Box as Boxie } from 'gestalt';

export default function TestBox() {
  return (
    <Boxie deprecatedPadding={2}>
      <Box
        alignItems="center"
        deprecatedPadding={{ x: 2 }}>
          <Box />
      </Box>
      <Box
        deprecatedPadding={{ y: 2 }}>
          <Box />
      </Box>
      <Box
        alignItems="center"
        deprecatedPadding={{ x: 2, y: 3 }}>
          <Box />
      </Box>
    </Boxie>
  );
}
