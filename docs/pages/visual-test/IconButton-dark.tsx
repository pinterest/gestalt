import { Box, ColorSchemeProvider, DesignTokensProvider, IconButton } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <IconButton
            accessibilityLabel="IconButton"
            bgColor="lightGray"
            icon="visit"
            iconColor="darkGray"
            size="md"
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
