// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, TileData } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <TileData
          title="Impressions"
          value="1.23M"
          selected
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
