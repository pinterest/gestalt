// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Button, Box, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw" height={170}>
        <PageHeader
          title="Product groups"
          subtext="S. E. All products USD"
          primaryAction={<Button color="red" size="lg" text="Create group" />}
          secondaryAction={<Button size="lg" text="Create group" />}
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
        />
      </Box>
    </ColorSchemeProvider>
  );
}
