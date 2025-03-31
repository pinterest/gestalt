import { Box, ColorSchemeProvider, DesignTokensProvider,IconButton, Tooltip } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" padding={4} width={150}>
          <Tooltip accessibilityLabel="" idealDirection="right" inline text="Share">
            <IconButton
              accessibilityLabel="Share this Pin"
              bgColor="white"
              icon="share"
              iconColor="darkGray"
              size="lg"
            />
          </Tooltip>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
