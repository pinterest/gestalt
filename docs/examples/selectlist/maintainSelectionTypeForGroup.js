// @flow strict
import { type Node } from 'react';
import { Box, Flex, SelectList } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 0, row: 2 }}>
        <SelectList id="selectlistexample6" label="Metric" onChange={() => {}} size="lg" value="v1">
          {[
            { label: 'Revenue', value: 'v1' },
            { label: 'Checkouts', value: 'v2' },
            { label: 'Purchasers', value: 'v3' },
            { label: 'Page visits', value: 'v4' },
            { label: 'Add to cart', value: 'v5' },
            { label: 'Pin clicks', value: 'v6' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>

        <SelectList
          id="selectlistexample7"
          label="Date range"
          onChange={() => {}}
          size="lg"
          value="v1"
        >
          {[
            { label: 'Last 7 days', value: 'v1' },
            { label: 'Last 14 days', value: 'v2' },
            { label: 'Last 21 days', value: 'v3' },
            { label: 'Last 30 days', value: 'v4' },
            { label: 'Last 60 days', value: 'v5' },
            { label: 'Last 90 days', value: 'v6' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Flex>
    </Box>
  );
}
