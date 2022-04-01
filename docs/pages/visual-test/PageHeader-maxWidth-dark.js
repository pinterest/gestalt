// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Button, Box, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw">
        <PageHeader
          title="Product groups"
          subtext="S. E. All products USD"
          primaryAction={{
            component: <Button color="red" size="lg" text="Create group" />,
            dropdownItems: [
              <Dropdown.Item
                key="Create"
                option={{ value: 'Create group', label: 'Create group' }}
                onSelect={() => {}}
              />,
            ],
          }}
          dropdownAccessibilityLabel="test"
          maxWidth={600}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
