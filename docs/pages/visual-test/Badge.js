// @flow strict
import { type Node } from 'react';
import { Badge, Box } from 'gestalt';

export default function AvatarGroupSpec(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1}>
      <Badge text="Try it out!" />
    </Box>
  );
}
