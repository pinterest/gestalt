// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Icon, IconButton, SearchField } from 'gestalt';

export default function SearchFieldExample(): Node {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ row: 4, column: 0 }} alignItems="center" flex="grow">
        <Icon icon="pinterest" color="brandPrimary" size={20} accessibilityLabel="Pinterest" />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldMainExample"
            onChange={({ value }) => setSearchValue(value)}
            placeholder="Search and explore"
            value={searchValue}
          />
        </Flex.Item>
        <IconButton accessibilityLabel="Notifications" icon="speech-ellipsis" size="md" />
        <IconButton accessibilityLabel="Profile" icon="person" size="md" />
      </Flex>
    </Box>
  );
}
