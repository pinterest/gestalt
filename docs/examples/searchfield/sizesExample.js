// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, SearchField, Text } from 'gestalt';

export default function SearchFieldExample(): Node {
  const [searchValue, setSearchValue] = useState('');
  const [lgValue, setLgValue] = useState('');
  return (
    <Box height="100%" display="flex" alignItems="center" justifyContent="center" wrap>
      <Box padding={8} width={350}>
        <Flex direction="column" flex="grow" gap={{ column: 4, row: 0 }}>
          <Text>Medium (md)</Text>
          <SearchField
            accessibilityLabel=""
            accessibilityClearButtonLabel="Clear search field"
            label="Search Messages"
            id="searchMessagesMedium"
            onChange={({ value }) => setSearchValue(value)}
            placeholder="Search by name"
            value={searchValue}
          />
        </Flex>
      </Box>

      <Box padding={8} width={350}>
        <Flex direction="column" flex="grow" gap={{ column: 4, row: 0 }}>
          <Text>Large (lg)</Text>
          <SearchField
            accessibilityLabel=""
            accessibilityClearButtonLabel="Clear search field"
            label="Search Messages"
            id="searchMessagesLarge"
            onChange={({ value }) => setLgValue(value)}
            placeholder="Search by name"
            value={lgValue}
            size="lg"
          />
        </Flex>
      </Box>
    </Box>
  );
}
