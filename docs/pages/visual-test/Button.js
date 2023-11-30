// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box padding={1}>
      <Button color="red" text="Save a Pin" />
    </Box>
  );
}
