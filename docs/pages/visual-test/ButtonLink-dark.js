// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ButtonLink, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <ButtonLink
          accessibilityLabel="Visit Pinterest"
          iconEnd="visit"
          size="lg"
          color="red"
          text="Visit Pinterest"
          rel="nofollow"
          target="blank"
          href="#"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
