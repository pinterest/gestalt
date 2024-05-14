import { useState } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('pepper#$%');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex.Item flex="grow">
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
      </Flex.Item>
    </Box>
  );
}
