import {ReactNode, useState} from 'react';
import { Box, Flex, SearchField, Text } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('');
  const [lgValue, setLgValue] = useState('');
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" wrap>
      <Box padding={8} width={350}>
        <Flex direction="column" flex="grow" gap={{ column: 4, row: 0 }}>
          <Text>Medium (md)</Text>
          <SearchField
            accessibilityClearButtonLabel="Clear search field"
            accessibilityLabel=""
            id="searchMessagesMedium"
            label="Search Messages"
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
            accessibilityClearButtonLabel="Clear search field"
            accessibilityLabel=""
            id="searchMessagesLarge"
            label="Search Messages"
            onChange={({ value }) => setLgValue(value)}
            placeholder="Search by name"
            size="lg"
            value={lgValue}
          />
        </Flex>
      </Box>
    </Box>
  );
}
