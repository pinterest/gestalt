// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box height={170} width="100vw">
      <PageHeader
        dropdownAccessibilityLabel="test"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="subtext_primaryAction"
              onSelect={() => {}}
              option={{ value: 'Create group', label: 'Create group' }}
            />,
          ],
        }}
        subtext="This is a substantially long subtext meant to wrap"
        title="Product groups"
      />
    </Box>
  );
}
