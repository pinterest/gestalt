import { Box, ColorSchemeProvider, DesignTokensProvider,TileData } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <TileData
            selected
            showCheckbox
            title="Total CPA and thisisasuperlongtitle (Checkout)"
            trend={{ value: -5, accessibilityLabel: 'Trending down' }}
            value="1.23M"
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
