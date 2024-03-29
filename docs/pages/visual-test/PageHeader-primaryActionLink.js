// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Dropdown, Link, PageHeader, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box height={170} width="100vw">
      <PageHeader
        dropdownAccessibilityLabel="test"
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
        title="Product groups"
      />
    </Box>
  );
}
