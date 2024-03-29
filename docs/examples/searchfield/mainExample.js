// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Icon, IconButton, SearchField } from 'gestalt';

export default function SearchFieldExample(): ReactNode {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" flex="grow" gap={{ row: 4, column: 0 }}>
        <Icon accessibilityLabel="Pinterest" color="brandPrimary" icon="pinterest" size={20} />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityClearButtonLabel="Clear search field"
            accessibilityLabel="Search all of Pinterest"
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
