// @flow strict
import { type Node } from 'react';
import { PageHeader, Text, Link, Box, Dropdown } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width="100vw" height={170}>
      <PageHeader
        title="Product groups"
        primaryAction={
          <Text weight="bold">
            <Link href="www.pinterest.com">Switch to quick ad creation</Link>
          </Text>
        }
        dropdownItems={[
          <Dropdown.Link
            key="Visit"
            href="www.pinterest.com"
            option={{ value: 'Switch to quick ad creation', label: 'Switch to quick ad creation' }}
          />,
        ]}
        dropdownAccessibilityLabel="test"
      />
    </Box>
  );
}
