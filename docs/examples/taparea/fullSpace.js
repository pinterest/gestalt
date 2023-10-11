// @flow strict
import { type Node } from 'react';
import { Box, TapArea } from 'gestalt';

export default function Example(): Node {
  return (
    <Box height="100%" width="100%" color="secondary">
      <TapArea fullHeight fullWidth onTap={() => {}} />
    </Box>
  );
}
