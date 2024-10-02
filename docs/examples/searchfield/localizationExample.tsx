import { useState } from 'react';
import { Box, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box height="100%" padding={4} width="100%">
      <SearchField
        accessibilityClearButtonLabel="खोज फ़ील्ड साफ़ करें"
        accessibilityLabel="सभी Pinterest खोजें"
        id="searchFieldLocalizationExample"
        onChange={({ value }) => setSearchValue(value)}
        placeholder="खोजें और एक्सप्लोर करें"
        value={searchValue}
      />
    </Box>
  );
}
