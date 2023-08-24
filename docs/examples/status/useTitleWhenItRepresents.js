// @flow strict
import { type Node } from 'react';
import { Box, Status } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Status type="inProgress" title="Pending review" />
    </Box>
  );
}
