// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, PageHeader, Box, Dropdown, Text, Link } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width="100vw" height={170}>
        <PageHeader
          title="Product groups"
          primaryAction={{
            component: (
              <Text weight="bold">
                <Link href="www.pinterest.com">Switch to quick ad creation</Link>
              </Text>
            ),
            dropdownItems: [
              <Dropdown.Link
                key="Visit"
                href="www.pinterest.com"
                option={{
                  value: 'Switch to quick ad creation',
                  label: 'Switch to quick ad creation',
                }}
              />,
            ],
          }}
          dropdownAccessibilityLabel="test"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
