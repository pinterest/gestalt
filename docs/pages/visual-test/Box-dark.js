// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={4}>
        <Box
          alignItems="center"
          borderStyle="raisedTopShadow"
          color="elevationRaised"
          display="flex"
          height={150}
          justifyContent="center"
          rounding={3}
          width={300}
        >
          <Text>A Box with elevation</Text>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
