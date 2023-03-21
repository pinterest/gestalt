// @flow strict
import { type Node } from 'react';
import { Text, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={4}>
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width={300}
        height={150}
        rounding={3}
        borderStyle="raisedTopShadow"
      >
        <Text>A Box with elevation</Text>
      </Box>
    </Box>
  );
}
