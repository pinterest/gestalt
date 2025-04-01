import { Box, ColorSchemeProvider, Datapoint, DesignTokensProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <Datapoint
            title="Total impressions"
            trend={{ value: -5, accessibilityLabel: 'Trending down' }}
            value="1.23M"
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
