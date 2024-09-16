import { useState } from 'react';
import { Box, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box height="100%" padding={4} width="100%">
      <SearchField
        accessibilityClearButtonLabel="Clear search field"
        accessibilityLabel="Search all of Pinterest"
        id="searchFieldA11yExample"
        onChange={({ value }) => setSearchValue(value)}
        placeholder="Search and explore"
        value={searchValue}
      />
    </Box>
  );
}
