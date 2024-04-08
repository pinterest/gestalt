// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, TileData } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1}>
        <TileData
          selected
          showCheckbox
          title="Total CPA and thisisasuperlongtitle (Checkout)"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
          value="1.23M"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
