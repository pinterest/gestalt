// @flow strict
import { type Node } from 'react';
import { Datapoint, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Datapoint
          title="Total impressions"
          value="1.23M"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
