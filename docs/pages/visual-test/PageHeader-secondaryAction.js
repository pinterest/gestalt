// @flow strict
import { type Node } from 'react';
import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw" height={170}>
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="secondaryAction_primaryAction"
              option={{ value: 'Promote', label: 'Promote' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Link
              key="secondaryAction_secondaryAction"
              isExternal
              option={{ value: 'View analytics', label: 'View analytics' }}
              href="https://pinterest.com"
            />,
          ],
        }}
        dropdownAccessibilityLabel="test"
      />
    </Box>
  );
}
