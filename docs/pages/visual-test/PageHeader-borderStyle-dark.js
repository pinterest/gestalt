// @flow strict
import { type Node } from 'react';
import { Box, Button, ColorSchemeProvider, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" width="100vw" height={100}>
        <PageHeader
          title="Product groups"
          primaryAction={{
            component: <Button color="red" size="lg" text="Create group" />,
            dropdownItems: [
              <Dropdown.Item
                key="borderStyle-dark"
                option={{ value: 'Create group', label: 'Create group' }}
                onSelect={() => {}}
              />,
            ],
          }}
          dropdownAccessibilityLabel="test"
          borderStyle="sm"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
