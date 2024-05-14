import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot() {
  return (
    <Box height={170} width="100vw">
      <PageHeader
        dropdownAccessibilityLabel="test"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="primaryAction"
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
