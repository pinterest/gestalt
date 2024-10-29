import { useState } from 'react';
import { Box, Flex, SelectList } from 'gestalt';

export default function Example() {
  const [country, setCountry] = useState('');
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <SelectList
          id="selectlist-enabled"
          label="Country"
          name="country"
          onChange={({ value }) => setCountry(value)}
          placeholder="Select a country"
          size="md"
          value={country}
        >
          {[
            { label: 'Algeria', value: 'algeria' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Canada', value: 'canada' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'France', value: 'france' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
        <SelectList
          id="selectlist-enabled"
          label="Country"
          name="country"
          onChange={({ value }) => setCountry(value)}
          placeholder="Select a country"
          size="lg"
          value={country}
        >
          {[
            { label: 'Algeria', value: 'algeria' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Canada', value: 'canada' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'France', value: 'france' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Flex>
    </Box>
  );
}
