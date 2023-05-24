// @flow strict
import { type Node } from 'react';
import { TileData, ColorSchemeProvider, Box } from 'gestalt';

export default function Snapshot(): Node {
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
