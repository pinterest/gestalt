import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot() {
  return (
    <Box height={100} width="100vw">
      <PageHeader
        borderStyle="sm"
        dropdownAccessibilityLabel="test"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="borderStyle"
              onSelect={() => {}}
              option={{ value: 'Create group', label: 'Create group' }}
            />,
          ],
        }}
        title="Product groups"
      />
    </Box>
  );
}
