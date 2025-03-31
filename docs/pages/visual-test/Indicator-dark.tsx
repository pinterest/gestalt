import { Box, ColorSchemeProvider, DesignTokensProvider, Flex, Indicator } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
            <Indicator accessibilityLabel="Visit the Gestalt documentation" />
            <Indicator accessibilityLabel="Visit the Gestalt documentation" count={3} />
            <Indicator accessibilityLabel="Visit the Gestalt documentation" count={11} />
            <Indicator accessibilityLabel="Visit the Gestalt documentation" count={86} />
            <Indicator accessibilityLabel="Visit the Gestalt documentation" count={100} />
          </Flex>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
