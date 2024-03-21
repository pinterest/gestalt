// @flow strict
import { type Node as ReactNode } from 'react';
import { Avatar, Box, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      </Box>
    </ColorSchemeProvider>
  );
}
