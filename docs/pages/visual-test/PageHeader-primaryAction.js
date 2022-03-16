// @flow strict
import { type Node } from 'react';
import { PageHeader, Button, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw">
      <PageHeader
        title="Product groups"
        primaryAction={<Button color="red" size="lg" text="Create group" />}
      />
    </Box>
  );
}
