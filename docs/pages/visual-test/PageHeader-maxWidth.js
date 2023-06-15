// @flow strict
import { type Node } from 'react';
import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="maxWidth"
              option={{ value: 'Create group', label: 'Create group' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="test"
        maxWidth={600}
      />
    </Box>
  );
}
