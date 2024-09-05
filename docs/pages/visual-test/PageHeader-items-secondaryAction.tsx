import { Box, Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot() {
  return (
    <Box height={170} width="100vw">
      <PageHeader
        dropdownAccessibilityLabel="test"
        items={[
          <Datapoint
            key="items-secondaryAction-datapoint-spend"
            size="md"
            title="Spend"
            trend={{ value: 29, accessibilityLabel: 'Trending up' }}
            value="$1.23M"
          />,
          <Datapoint
            key="items-secondaryAction-datapoint-spend2"
            size="md"
            title="Spend"
            trend={{ value: 29, accessibilityLabel: 'Trending up' }}
            value="$1.23M"
          />,
        ]}
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="items-secondaryAction-primaryAction"
              onSelect={() => {}}
              option={{ value: 'Promote', label: 'Promote' }}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Link
              key="items-secondaryAction-secondaryAction"
              href="https://pinterest.com"
              iconEnd="visit"
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
