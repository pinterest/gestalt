import { ReactNode } from 'react';
import { Box, Button, ColorSchemeProvider, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" height={100} width="100vw">
        <PageHeader
          borderStyle="sm"
          dropdownAccessibilityLabel="test"
          primaryAction={{
            component: <Button color="red" size="lg" text="Create group" />,
            dropdownItems: [
              <Dropdown.Item
                key="borderStyle-dark"
                onSelect={() => {}}
                option={{ value: 'Create group', label: 'Create group' }}
              />,
            ],
          }}
          title="Product groups"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
