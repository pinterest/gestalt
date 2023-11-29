// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function SearchFieldExample(): ReactNode {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesLabelExample"
          onChange={({ value }) => setSearchValue(value)}
          placeholder="Search by name"
          value={searchValue}
        />
      </Flex.Item>
    </Box>
  );
}
