import { useState } from 'react';
import { Box, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
