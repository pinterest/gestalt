// @flow strict
import { type Node } from 'react';
import { Avatar, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Avatar verified size="xl" name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      </Box>
    </ColorSchemeProvider>
  );
}
