import { useState } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('pepper#$%');

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel=""
          errorMessage="Invalid search term, please avoid special characters."
          id="searchMessagesError"
          label="Search Messages"
          onChange={({ value }) => setSearchValue(value)}
          placeholder="Search by name"
          size="md"
          value={searchValue}
        />
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel=""
          errorMessage="Invalid search term, please avoid special characters."
          id="searchMessagesError"
          label="Search Messages"
          onChange={({ value }) => setSearchValue(value)}
          placeholder="Search by name"
          size="lg"
          value={searchValue}
        />
      </Flex>
    </Box>
  );
}
