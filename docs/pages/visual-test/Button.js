// @flow strict
import { type Node } from 'react';
import { Box, Button } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <Button color="red" text="Save a Pin" />
    </Box>
  );
}
