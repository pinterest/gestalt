// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Datapoint } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Datapoint
          title="Total impressions"
          value="1.23M"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
