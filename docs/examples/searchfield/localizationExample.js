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
            accessibilityLabel="सभी Pinterest खोजें"
            accessibilityClearButtonLabel="खोज फ़ील्ड साफ़ करें"
            id="searchFieldLocalizationExample"
            onChange={({ value }) => setSearchValue(value)}
            placeholder="खोजें और एक्सप्लोर करें"
            value={searchValue}
          />
        </Flex.Item>
        <IconButton accessibilityLabel="सूचनाएं" icon="speech-ellipsis" size="md" />
        <IconButton accessibilityLabel="प्रोफ़ाइल" icon="person" size="md" />
      </Flex>
    </Box>
  );
}
