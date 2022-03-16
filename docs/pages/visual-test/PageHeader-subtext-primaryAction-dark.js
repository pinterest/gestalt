// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Button, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw">
        <PageHeader
          title="Product groups"
          subtext="This is a substantially long subtext meant to wrap"
          primaryAction={<Button color="red" size="lg" text="Create group" />}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
