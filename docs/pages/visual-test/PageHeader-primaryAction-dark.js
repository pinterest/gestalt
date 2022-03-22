// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Button, Box, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw" height={170}>
        <PageHeader
          title="Product groups"
          primaryAction={<Button color="red" size="lg" text="Create group" />}
          dropdownItems={[
            <Dropdown.Item
              key="Create"
              option={{ value: 'Create group', label: 'Create group' }}
              onSelect={() => {}}
            />,
          ]}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
