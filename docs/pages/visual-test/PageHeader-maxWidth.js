// @flow strict
import { type Node } from 'react';
import { PageHeader, Button, Box, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={<Button color="red" size="lg" text="Create group" />}
        dropdownItems={[
          <Dropdown.Item
            key="Create"
            option={{ value: 'Create group', label: 'Create group' }}
            onSelect={() => {}}
          />,
        ]}
        maxWidth={600}
      />
    </Box>
  );
}
