import { useState } from 'react';
import { BannerSlim, Box, Flex, SelectList, Text } from 'gestalt';

export default function Example() {
  const [range, setRange] = useState('');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6}>
        <Text size="400" weight="bold">
          Select a Pin release date range
        </Text>
        <BannerSlim
          iconAccessibilityLabel="Recommendation"
          message="Pin launches work better on weekends."
          type="recommendationBare"
        />
        <SelectList
          id="selectlist-hidden-label"
          label="Date range"
          labelDisplay="hidden"
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
