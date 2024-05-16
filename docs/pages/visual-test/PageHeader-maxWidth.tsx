import { ReactNode } from 'react';
import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot() {
  return (
    <Box width="100vw">
      <PageHeader
        dropdownAccessibilityLabel="test"
        maxWidth={600}
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="maxWidth"
              onSelect={() => {}}
              option={{ value: 'Create group', label: 'Create group' }}
            />,
          ],
        }}
        subtext="S. E. All products USD"
        title="Product groups"
      />
    </Box>
  );
}
