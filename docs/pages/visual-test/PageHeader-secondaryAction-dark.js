// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Button, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw">
        <PageHeader
          title="Product groups"
          subtext="S. E. All products USD"
          primaryAction={<Button color="red" size="lg" text="Create group" />}
          secondaryAction={<Button size="lg" text="Create group" />}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
