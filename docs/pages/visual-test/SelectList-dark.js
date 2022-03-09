// @flow strict
import { type Node } from 'react';
import { SelectList, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <SelectList
          id="selectlistexample11"
          onChange={() => {}}
          options={[
            { label: 'Algeria', value: 'algeria' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Canada', value: 'canada' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'France', value: 'france' },
          ]}
          size="md"
          label="Country"
        />{' '}
      </Box>
    </ColorSchemeProvider>
  );
}
