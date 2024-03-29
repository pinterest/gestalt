// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, TapArea } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box color="secondary" height="100%" width="100%">
      <TapArea fullHeight fullWidth onTap={() => {}} />
    </Box>
  );
}
