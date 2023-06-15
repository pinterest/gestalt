// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function SearchFieldExample(): Node {
  const [searchValue, setSearchValue] = useState('pepper#$%');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesError"
          onChange={({ value }) => setSearchValue(value)}
          placeholder="Search by name"
          value={searchValue}
          errorMessage="Invalid search term, please avoid special characters."
        />
      </Flex.Item>
    </Box>
  );
}
