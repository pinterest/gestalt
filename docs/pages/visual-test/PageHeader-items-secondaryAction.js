// @flow strict
import { type Node } from 'react';
import { Box, Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw" height={170}>
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        items={[
          <Datapoint
            key="items-secondaryAction-datapoint-spend"
            size="md"
            title="Spend"
            value="$1.23M"
            trend={{ value: 29, accessibilityLabel: 'Trending up' }}
          />,
          <Datapoint
            key="items-secondaryAction-datapoint-spend2"
            size="md"
            title="Spend"
            value="$1.23M"
            trend={{ value: 29, accessibilityLabel: 'Trending up' }}
          />,
        ]}
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="items-secondaryAction-primaryAction"
              option={{ value: 'Promote', label: 'Promote' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Link
              isExternal
              key="items-secondaryAction-secondaryAction"
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
