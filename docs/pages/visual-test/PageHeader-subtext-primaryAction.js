// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box width="100vw" height={170}>
      <PageHeader
        title="Product groups"
        subtext="This is a substantially long subtext meant to wrap"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="subtext_primaryAction"
              option={{ value: 'Create group', label: 'Create group' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="test"
      />
    </Box>
  );
}
