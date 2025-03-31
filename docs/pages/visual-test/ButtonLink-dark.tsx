import { Box, ButtonLink, ColorSchemeProvider, DesignTokensProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">     <DesignTokensProvider>
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
    </DesignTokensProvider></ColorSchemeProvider>
  );
}
