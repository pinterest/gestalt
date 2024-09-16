import { useState } from 'react';
import { Box, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('pepper#$%');

  return (
    <Box height="100%" padding={4} width="100%">
      <SearchField
        accessibilityClearButtonLabel="Clear search field"
        accessibilityLabel=""
        errorMessage="Invalid search term, please avoid special characters."
        id="searchMessagesError"
        label="Search Messages"
        onChange={({ value }) => setSearchValue(value)}
        placeholder="Search by name"
        value={searchValue}
      />
    </Box>
  );
}
