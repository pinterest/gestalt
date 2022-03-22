// @flow strict
import { type Node } from 'react';
import { PageHeader, Button, Box, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw" height={170}>
      <PageHeader
        title="Product groups"
        subtext="This is a substantially long subtext meant to wrap"
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
  );
}
