import { ReactNode } from 'react';
import { Box, Text } from 'gestalt';

export default function Snapshot() {
  return (
    <Box color="default" display="inlineBlock" padding={4}>
      <Box
        alignItems="center"
        borderStyle="raisedTopShadow"
        display="flex"
        height={150}
        justifyContent="center"
        rounding={3}
        width={300}
      >
        <Text>A Box with elevation</Text>
      </Box>
    </Box>
  );
}
