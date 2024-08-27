import { useState } from 'react';
import { Box, Flex, SelectList } from 'gestalt';

export default function Example() {
  const [range, setRange] = useState('');

  return (
    <Box padding={8} width="100%">
      <Flex gap={6}>
        <SelectList
          id="selectlist-visible-label"
          label="Date range"
          onChange={({ value }) => setRange(value)}
          placeholder="Select a country"
          value={range}
        >
          {[
            { label: 'Last 5 days', value: '5' },
            { label: 'Last week', value: '7' },
            { label: 'Last 30 days', value: '30' },
            { label: 'Last sixth months', value: '6m' },
            { label: 'Last year', value: '365' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Flex>
    </Box>
  );
}
