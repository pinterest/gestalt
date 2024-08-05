import { useState } from 'react';
import { Box, SelectList } from 'gestalt';

export default function Example() {
  const [country, setCountry] = useState('');
  return (
    <Box padding={8} width="100%">
      <SelectList
        id="selectlistexample13"
        label="Country"
        name="country"
        onChange={({ value }) => setCountry(value)}
        placeholder="Select a country"
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
    </Box>
  );
}
