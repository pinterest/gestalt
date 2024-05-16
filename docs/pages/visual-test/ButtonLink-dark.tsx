import { ReactNode } from 'react';
import { Box, ButtonLink, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <ButtonLink
          accessibilityLabel="Visit Pinterest"
          color="red"
          href="#"
          iconEnd="visit"
          rel="nofollow"
          size="lg"
          target="blank"
          text="Visit Pinterest"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
