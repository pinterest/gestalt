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
              key="secondaryAction_primaryAction"
              onSelect={() => {}}
              option={{ value: 'Promote', label: 'Promote' }}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Link
              key="secondaryAction_secondaryAction"
              href="https://pinterest.com"
              isExternal
              option={{ value: 'View analytics', label: 'View analytics' }}
            />,
          ],
        }}
        subtext="S. E. All products USD"
        title="Product groups"
      />
    </Box>
  );
}
