// @flow strict
import { type Node } from 'react';
import { Box, Button } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={100}>
        <Button color="red" text="Go to..." />
      </Box>
    </Box>
  );
}
