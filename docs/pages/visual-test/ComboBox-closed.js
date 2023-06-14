// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, ComboBox } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={1} width={400}>
        <ComboBox
          accessibilityClearButtonLabel="Clear the current values"
          label="Select your favorite shape"
          id="favoriteShape"
          noResultText="No results for your selection"
          options={[
            { label: 'square', value: '1' },
            { label: 'circle', value: '2' },
          ]}
          placeholder="Select a shape"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
