// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Status } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Status type="problem" title="Error" subtext="Please try again" />
    </Box>
  );
}
