// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Button, Box, Datapoint, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw" height={170}>
        <PageHeader
          title="Product groups"
          subtext="S. E. All products USD"
          items={[
            <Datapoint
              key="Spend"
              size="md"
              title="Spend"
              value="$1.23M"
              trend={{ value: 29, accessibilityLabel: 'Trending up' }}
            />,
            <Datapoint
              key="Spend2"
              size="md"
              title="Spend"
              value="$1.23M"
              trend={{ value: 29, accessibilityLabel: 'Trending up' }}
            />,
          ]}
          primaryAction={<Button color="red" size="lg" text="Promote" />}
          secondaryAction={<Button size="lg" text="View analytics" />}
          dropdownItems={[
            <Dropdown.Item
              key="Promote"
              option={{ value: 'Promote', label: 'Promote' }}
              onSelect={() => {}}
            />,
            <Dropdown.Link
              key="Analytics"
              isExternal
              option={{ value: 'View analytics', label: 'View analytics' }}
              href="https://pinterest.com"
            />,
          ]}
          dropdownAccessibilityLabel="test"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
