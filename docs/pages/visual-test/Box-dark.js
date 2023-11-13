// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={4}>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          width={300}
          height={150}
          rounding={3}
          color="elevationRaised"
          borderStyle="raisedTopShadow"
        >
          <Text>A Box with elevation</Text>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
