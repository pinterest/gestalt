// @flow strict
import { type Node, useState } from 'react';
import { Box, SearchField } from 'gestalt';

export default function SearchFieldExample(): Node {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SearchField
        accessibilityLabel="सभी Pinterest खोजें"
        accessibilityClearButtonLabel="खोज फ़ील्ड साफ़ करें"
        id="searchFieldLocalizationExample"
        onChange={({ value }) => setSearchValue(value)}
        placeholder="खोजें और एक्सप्लोर करें"
        value={searchValue}
      />
    </Box>
  );
}
