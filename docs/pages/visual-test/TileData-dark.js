// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, TileData } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <TileData
          selected
          title="Impressions"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
          value="1.23M"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
