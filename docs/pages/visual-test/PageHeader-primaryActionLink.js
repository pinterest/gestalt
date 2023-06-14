// @flow strict
import { type Node } from 'react';
import { Box, Dropdown, Link, PageHeader, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw" height={170}>
      <PageHeader
        title="Product groups"
        primaryAction={{
          component: (
            <Text weight="bold">
              <Link href="http://www.pinterest.com">Switch to quick ad creation</Link>
            </Text>
          ),
          dropdownItems: [
            <Dropdown.Link
              key="primaryActionLink"
              href="http://www.pinterest.com"
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
  );
}
