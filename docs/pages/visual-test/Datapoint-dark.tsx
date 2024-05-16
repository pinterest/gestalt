import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Datapoint } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Datapoint
          title="Total impressions"
          trend={{ value: -5, accessibilityLabel: 'Trending down' }}
          value="1.23M"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
