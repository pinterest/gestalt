// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Icon, IconButton, SearchField } from 'gestalt';

export default function SearchFieldExample(): Node {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex alignItems="center" flex="grow" gap={{ row: 4, column: 0 }}>
        <Icon accessibilityLabel="Pinterest" color="brandPrimary" icon="pinterest" size={20} />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldA11yExample"
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
